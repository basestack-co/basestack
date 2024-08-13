import type { TriggerConfig } from "@trigger.dev/sdk/v3";
import { PrismaInstrumentation } from "@prisma/instrumentation";

export const config: TriggerConfig = {
  project: "YOUR_PROJECT_ID",
  logLevel: "log",
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
  triggerDirectories: ["./libs/trigger"],
  additionalFiles: ["./prisma/schema.prisma"],
  additionalPackages: ["prisma@5.18.0", "@prisma/instrumentation@5.18.0"],
  dependenciesToBundle: [/^(?!@prisma).*/],
  postInstall:
    "npm exec --package prisma -- prisma generate --schema=./prisma/schema.prisma",
};
