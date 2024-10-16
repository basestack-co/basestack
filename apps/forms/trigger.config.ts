import type { TriggerConfig } from "@trigger.dev/sdk/v3";
import { PrismaInstrumentation } from "@prisma/instrumentation";

export const config: TriggerConfig = {
  project: "proj_gkgcyqmdxxyquflxhmvu",
  logLevel: "log",
  dirs: ["./libs/trigger"],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 2,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  instrumentations: [new PrismaInstrumentation()],
};
