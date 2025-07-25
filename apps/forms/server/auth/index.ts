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
  product: Product.FORMS,
  env: AppMode as AppEnv,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  welcomeEmail: {
    subject: `Welcome to Basestack Forms`,
    content: {
      title: "Welcome to Basestack Forms",
      description:
        "Welcome to Basestack Forms, the platform that elevates your website with powerful, customizable forms.",
      link: config.urls.getAppWithEnv(Product.FORMS, AppMode as AppEnv),
    },
  },
});
