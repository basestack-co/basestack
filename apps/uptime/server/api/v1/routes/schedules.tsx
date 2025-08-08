// Vendors
import {
  type CreateMonitorCheckSchedulePayload,
  polar,
} from "@basestack/vendors";
import { WorkflowNonRetryableError } from "@upstash/workflow";
// Database
import { prisma } from "server/db";
// Utils
import { Product, UsageEvent } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import { getPerformCheck, monitorConfigSchema } from "../utils/monitoring";
// UpStash Workflow
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";

const schedulesRoutes = new Hono().post(
  "/monitor-check",
  serve<CreateMonitorCheckSchedulePayload>(
    async (context) => {
      const {
        monitorId,
        adminUserEmail,
        externalCustomerId = "",
      } = context.requestPayload;

      /* await context.run("subscription-check-step", async () => {
        const sub = await polar.getCustomerSubscription(
          externalCustomerId,
          Product.UPTIME,
          AppMode
        );

        if (!sub) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - No subscription found for externalCustomerId ${externalCustomerId}`
          );
        }
      }); */

      await context.run("monitor-check-step", async () => {
        const monitor = await prisma.monitor.findUnique({
          where: {
            id: monitorId,
          },
          select: {
            type: true,
            config: true,
          },
        });

        if (!monitor) return;

        const config = monitorConfigSchema.safeParse(monitor.config);

        if (!config.success) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - Invalid monitor config ${JSON.stringify(config.error)}`
          );
        }

        console.info(
          `Schedules: Basestack Uptime - Monitor Check - Preparing to check monitor ${monitorId} with config ${JSON.stringify(config.data)}`
        );

        const result = await getPerformCheck(monitor.type, config.data);

        if (!result) {
          throw new WorkflowNonRetryableError(
            `Schedules: Basestack Uptime - Monitor Check - No result from getPerformCheck`
          );
        }

        await prisma.monitorCheck.create({
          data: {
            monitorId,
            ...result,
          },
        });
      });

      /*  await context.run("create-usage-event-step", async () => {
        await polar.createUsageEvent(
          UsageEvent.API_REQUESTS,
          externalCustomerId,
          {
            product: Product.UPTIME,
            projectName: "Basestack Uptime",
            adminUserEmail,
          }
        );
      }); */
    },
    {
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
