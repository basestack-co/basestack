// Auth
import { betterAuth } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Plugins
import { multiSession } from "better-auth/plugins";
// Utils
import { AppMode } from "utils/helpers/general";
import { config, Product, AppEnv } from "@basestack/utils";
// Vendors
import { qstash } from "@basestack/vendors";
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
              subject: `Welcome to Basestack Feature Flags`,
              props: {
                content: {
                  name: user.name,
                  title: "Welcome to Basestack Feature Flags",
                  description:
                    "Welcome to BaseStack Feature Flags, the ultimate solution for seamlessly managing feature rollouts. Effortlessly toggle features, run A/B tests, and deploy updates with confidence—all without redeploying your code. 🚀",
                  link: config.urls.getAppWithEnv(
                    Product.FLAGS,
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
