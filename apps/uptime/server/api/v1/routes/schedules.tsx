// Vendors
import type { CreateMonitorCheckSchedulePayload } from "@basestack/vendors";
// UpStash Workflow
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";

async function httpCheck(config: any): Promise<any> {
  const startTime = Date.now();

  try {
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body,
      // timeout: config.timeout * 1000,
      signal: AbortSignal.timeout(config.timeout * 1000),
    });

    const responseTime = Date.now() - startTime;
    let isUp = response.status === config.expectedStatus;

    // Keyword check if specified
    if (config.keyword && isUp) {
      const text = await response.text();
      isUp = text.includes(config.keyword);
    }

    return {
      status: isUp ? "UP" : "DOWN",
      responseTime,
      statusCode: response.status,
      errorMessage: isUp
        ? null
        : `Expected ${config.expectedStatus}, got ${response.status}`,
    };
  } catch (error) {
    return {
      status: "DOWN",
      responseTime: Date.now() - startTime,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function performCheck(type: string, config: any) {
  switch (type) {
    case "HTTP":
      return await httpCheck(config);
    /* case 'PING':
      return await pingCheck(config);
    case 'TCP':
      return await tcpCheck(config);
    case 'SSL_CERTIFICATE':
      return await sslCheck(config); */
  }
}

const schedulesRoutes = new Hono().post(
  "/monitor-check",
  serve<CreateMonitorCheckSchedulePayload>(
    async (context) => {
      const { url, method } = context.requestPayload;

      await context.run("monitor-check-step", async () => {
        const result = await performCheck("HTTP", {
          url,
          method,
          headers: {},
          body: "",
          expectedStatus: 200,
          keyword: "",
          timeout: 30000,
        });

        console.log("result", result);
      });
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
