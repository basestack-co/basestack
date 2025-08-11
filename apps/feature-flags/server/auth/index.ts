// Auth

import { type AppEnv, config, Product } from "@basestack/utils";
// Vendors
import { auth as authVendor } from "@basestack/vendors";
import type { betterAuth } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Utils
import { AppMode } from "../../utils/helpers/general";
// DB
import { getDb } from "server/db";

export const auth: ReturnType<typeof betterAuth> = authVendor.createAuthServer({
  product: Product.FLAGS,
  env: AppMode as AppEnv,
  database: prismaAdapter(getDb(), {
    provider: "postgresql",
  }),
  welcomeEmail: {
    subject: `Welcome to Basestack Feature Flags`,
    content: {
      title: "Welcome to Basestack Feature Flags",
      description:
        "Welcome to BaseStack Feature Flags, the ultimate solution for seamlessly managing feature rollouts. Effortlessly toggle features, run A/B tests, and deploy updates with confidence—all without redeploying your code. 🚀",
      link: config.urls.getAppWithEnv(Product.FLAGS, AppMode as AppEnv),
    },
  },
});
