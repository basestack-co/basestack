import * as Sentry from "@sentry/nextjs";
// Libs
import prisma from "libs/prisma";
// Integrations
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  _experiments: {
    metricsAggregator: true,
  },
  tracesSampleRate: 1.0,
  // Profiling sample rate is relative to tracesSampleRate
  profilesSampleRate: 1.0,
  integrations: [
    nodeProfilingIntegration(),
    new Sentry.Integrations.Prisma({ client: prisma }),
  ],
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});
