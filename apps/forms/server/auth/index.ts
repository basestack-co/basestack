// Auth
import { betterAuth } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Plugins
import { multiSession } from "better-auth/plugins";
// Vendors
import { qstash } from "@basestack/vendors";
// Utils
import { AppMode } from "utils/helpers/general";
import { config, Product, AppEnv } from "@basestack/utils";
// DB
import { prisma } from "../db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  disabledPaths: ["/sign-up/email", "/sign-in/email"],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      allowDifferentEmails: false,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user) {
            await qstash.events.sendEmailEvent({
              template: "welcome",
              to: [user.email],
              subject: `Welcome to Basestack Forms`,
              props: {
                content: {
                  name: user.name,
                  title: "Welcome to Basestack Forms",
                  description:
                    "Welcome to Basestack Forms, the platform that elevates your website with powerful, customizable forms.",
                  link: config.urls.getAppWithEnv(
                    Product.FORMS,
                    AppMode as AppEnv,
                  ),
                },
              },
            });
          }
        },
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [multiSession()],
});
