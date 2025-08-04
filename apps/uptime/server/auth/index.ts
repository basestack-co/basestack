// Auth

import { type AppEnv, config, Product } from "@basestack/utils";
// Vendors
import { auth as authVendor } from "@basestack/vendors";
import type { betterAuth } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Utils
import { AppMode } from "utils/helpers/general";
// DB
import { prisma } from "../db";

export const auth: ReturnType<typeof betterAuth> = authVendor.createAuthServer({
  product: Product.UPTIME,
  env: AppMode as AppEnv,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  welcomeEmail: {
    subject: `Welcome to Basestack Uptime`,
    content: {
      title: "Welcome to Basestack Uptime",
      description:
        "Welcome to Basestack Uptime, the platform that monitors your website's uptime and performance.",
      link: config.urls.getAppWithEnv(Product.UPTIME, AppMode as AppEnv),
    },
  },
});
