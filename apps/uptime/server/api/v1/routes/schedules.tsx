// Utils

import { IncidentSeverity, IncidentStatus } from ".prisma/client";
import { type AppEnv, config, Product, UsageEvent } from "@basestack/utils";
// Vendors
import {
  type CreateMonitorCheckSchedulePayload,
  polar,
  qstash,
} from "@basestack/vendors";
import { Receiver } from "@upstash/qstash";
import { WorkflowNonRetryableError } from "@upstash/workflow";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
// Database
import { prisma } from "server/db";
import { AppMode } from "utils/helpers/general";
import { getPerformCheck, monitorConfigSchema } from "../utils/monitoring";

const schedulesRoutes = new Hono().post(
  "/monitor-check",
  serve<CreateMonitorCheckSchedulePayload>(
    async (context) => {
      const {
        projectId,
        monitorId,
        adminUserEmail,
        externalCustomerId = "",
      } = context.requestPayload;

      const monitor = await context.run(
        "get-monitor-details-step",
        async () => {
          return prisma.monitor.findUnique({
            where: {
              id: monitorId,
            },
            select: {
              name: true,
              type: true,
              config: true,
              project: { select: { name: true } },
            },
          });
        },
      );

      const result = await context.run("monitor-check-step", async () => {
        if (!monitor) return;

        const config = monitorConfigSchema.safeParse(monitor.config);

        if (!config.success) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - Invalid monitor config ${JSON.stringify(config.error)}`,
          );
        }

        console.info(
          `Schedules: Basestack Uptime - Monitor Check - Preparing to check monitor ${monitorId} with config ${JSON.stringify(config.data)}`,
        );

        const data = await getPerformCheck(monitor.type, config.data);

        if (!data) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - No result from getPerformCheck`,
          );
        }

        await prisma.monitorCheck.create({
          data: {
            monitorId,
            ...data,
          },
        });

        return data;
      });

      await context.run("create-usage-event-step", async () => {
        const data = await polar.createUsageEvent(
          UsageEvent.API_REQUESTS,
          externalCustomerId,
          {
            product: Product.UPTIME,
            projectName: "Basestack Uptime",
            adminUserEmail,
          },
        );

        return data;
      });

      await context.run("create-incident-step", async () => {
        if (!monitor || !result || result.status === "UP") return;

        const severity =
          result.status === "DOWN"
            ? IncidentSeverity.CRITICAL
            : result.status === "DEGRADED"
              ? IncidentSeverity.MAJOR
              : IncidentSeverity.MINOR;

        const title = `Monitor ${monitor.name} is ${result.status}`;
        const initialUpdate =
          `Status: ${result.status}. ` +
          `Response time: ${result.responseTime}ms. ` +
          `Status code: ${result.statusCode}. ` +
          (result.error ? `Error: ${result.error}` : "");

        const incident = await prisma.incident.create({
          data: {
            projectId,
            title,
            description: result.error ?? null,
            status: IncidentStatus.INVESTIGATING,
            severity,
            isScheduled: false,
            monitors: { create: [{ monitorId }] },
            updates: {
              create: {
                message: initialUpdate,
                status: IncidentStatus.INVESTIGATING,
                createdById: null,
              },
            },
          },
        });

        console.info(
          `Schedules: Basestack Uptime - Monitor Check - Incident created for monitor ${monitorId}`,
        );

        return incident;
      });

      const resolvedIncident = await context.run(
        "resolve-incident-step",
        async () => {
          if (!monitor || !result || result.status !== "UP") return;

          const existing = await prisma.incident.findFirst({
            where: {
              projectId,
              status: { not: IncidentStatus.RESOLVED },
              createdById: null,
              monitors: { some: { monitorId } },
            },
            select: { id: true },
            orderBy: { createdAt: "desc" },
          });

          if (!existing) return;

          const message =
            `Recovered automatically. ` +
            `Status: ${result.status}. ` +
            `Response time: ${result.responseTime}ms. ` +
            `Status code: ${result.statusCode}.`;

          await prisma.$transaction(async (tx) => {
            await tx.incidentUpdate.create({
              data: {
                incidentId: existing.id,
                message,
                status: IncidentStatus.RESOLVED,
                createdById: null,
              },
            });

            await tx.incident.update({
              where: { id: existing.id },
              data: {
                status: IncidentStatus.RESOLVED,
                resolvedAt: new Date(),
              },
            });
          });

          console.info(
            `Schedules: Basestack Uptime - Monitor Check - Auto-resolved incident ${existing.id} for monitor ${monitorId}`,
          );

          return { id: existing.id };
        },
      );

      await context.run("send-email-notifications-step", async () => {
        if (!monitor || !result) return;

        const isAlert = result.status !== "UP";
        const isAutoResolved = result.status === "UP" && !!resolvedIncident;
        if (!isAlert && !isAutoResolved) return;

        const members = await prisma.projectUsers.findMany({
          where: { projectId },
          select: { user: { select: { email: true } } },
        });

        const to = Array.from(
          new Set(
            [
              ...members
                .map((m) => m.user.email)
                .filter((e): e is string => !!e),
              adminUserEmail,
            ].filter(Boolean),
          ),
        );
        if (to.length === 0) return;

        const subject = isAlert
          ? `Alert: "${monitor.name}" is ${result.status}`
          : `Resolved: "${monitor.name}" is back UP`;

        const description = isAlert
          ? `Project: ${monitor.project.name}. Status code: ${result.statusCode}. ${
              result.error ? `Error: ${result.error}` : "No error reported."
            }`
          : `Project: ${monitor.project.name}. Incident was auto-resolved by Basestack Uptime. Status code: ${result.statusCode}.`;

        const linkUrl = `${config.urls.getAppWithEnv(
          Product.UPTIME,
          AppMode as AppEnv,
        )}/a/project/${projectId}/monitors`;

        await qstash.events.sendEmailEvent({
          template: "welcome",
          to,
          subject,
          externalCustomerId,
          props: {
            content: {
              name: "team",
              title: subject,
              description,
              link: linkUrl,
            },
          },
        });
      });
    },
    {
      verbose: true,
      receiver: new Receiver({
        currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
        nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
      }),
      failureFunction: async ({
        context,
        failStatus,
        failResponse,
        failHeaders,
      }) => {
        console.error(
          `Schedules: Basestack Uptime - Monitor Check - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
        );
      },
    },
  ),
);

export default schedulesRoutes;
