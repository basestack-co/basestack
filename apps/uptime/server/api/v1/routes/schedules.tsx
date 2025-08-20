// Utils

import { IncidentSeverity, IncidentStatus } from ".prisma/client";
import { Product, UsageEvent } from "@basestack/utils";
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
import {
  getPerformCheck,
  createMonitorEmailNotification,
} from "../utils/monitoring";
// Schemas
import { MonitorConfigSchema } from "utils/schemas/monitor";

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
              scheduleId: true,
              project: { select: { id: true, name: true } },
            },
          });
        }
      );

      const check = await context.run("monitor-check-step", async () => {
        if (!monitor) return;

        const config = MonitorConfigSchema.safeParse(monitor.config);

        if (!config.success) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - Invalid monitor config ${JSON.stringify(config.error)}`
          );
        }

        const data = await getPerformCheck(monitor.type, config.data);

        if (!data) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - No result from getPerformCheck for monitor ${monitorId}`
          );
        }

        return prisma.monitorCheck.create({
          data: {
            monitorId,
            ...data,
          },
        });
      });

      await context.run("create-usage-event-step", async () => {
        if (!monitor?.scheduleId) return;

        const sub = await polar.getCustomerSubscription(
          externalCustomerId,
          Product.UPTIME,
          AppMode
        );

        if (!sub?.id) {
          await qstash.schedules.pauseSchedule(monitor.scheduleId);

          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - No subscription found for project ${projectId}`
          );
        }
        return polar.createUsageEvent(
          UsageEvent.UPTIME_API_REQUESTS,
          externalCustomerId,
          {
            product: Product.UPTIME,
            projectName: "Basestack Uptime",
            adminUserEmail,
          }
        );
      });

      const existingIncident = await context.run(
        "get-monitor-incident-details-step",
        async () => {
          if (!monitor || !check || check.status === "UP") return;

          const response = await prisma.incident.findFirst({
            where: {
              projectId,
              status: { not: IncidentStatus.RESOLVED },
              createdById: null,
              monitors: { some: { monitorId } },
            },
            select: { id: true },
            orderBy: { createdAt: "desc" },
          });

          return response;
        }
      );

      await context.run("resolve-incident-step", async () => {
        if (!existingIncident || !check || !monitor) return;

        const message =
          `Recovered automatically. ` +
          `Status: ${check.status}. ` +
          `Response time: ${check.responseTime}ms. ` +
          `Status code: ${check.statusCode}.`;

        const response = await prisma.$transaction(async (tx) => {
          await tx.incidentUpdate.create({
            data: {
              incidentId: existingIncident.id,
              message,
              status: IncidentStatus.RESOLVED,
              createdById: null,
            },
          });

          await tx.incident.update({
            where: { id: existingIncident.id },
            data: {
              status: IncidentStatus.RESOLVED,
              resolvedAt: new Date(),
            },
          });
        });

        await createMonitorEmailNotification({
          emails: `${adminUserEmail}`,
          externalCustomerId,
          monitor,
          check,
        });

        console.info(
          `Schedules: Basestack Uptime - Monitor Check - Auto-resolved incident ${existingIncident.id} for monitor ${monitorId}`
        );

        return response;
      });

      await context.run("create-incident-step", async () => {
        if (!monitor || !check || !!existingIncident?.id) return;

        const severity =
          check.status === "DOWN"
            ? IncidentSeverity.CRITICAL
            : check.status === "DEGRADED"
              ? IncidentSeverity.MAJOR
              : IncidentSeverity.MINOR;

        const title = `Monitor ${monitor.name} is ${check.status}`;
        const initialUpdate =
          `Status: ${check.status}. ` +
          `Response time: ${check.responseTime}ms. ` +
          `Status code: ${check.statusCode}. ` +
          (check.error ? `Error: ${check.error}` : "");

        const incident = await prisma.incident.create({
          data: {
            projectId,
            title,
            description: check.error ?? null,
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

        await createMonitorEmailNotification({
          emails: `${adminUserEmail}`,
          externalCustomerId,
          monitor,
          check,
        });

        console.info(
          `Schedules: Basestack Uptime - Monitor Check - Incident created for monitor ${monitorId}`
        );

        return incident;
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
          `Schedules: Basestack Uptime - Monitor Check - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `
        );
      },
    }
  )
);

export default schedulesRoutes;
