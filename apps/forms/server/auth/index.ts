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
// Payments
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { polarClient } from "../../libs/polar/client";

export const auth: ReturnType<typeof betterAuth> = betterAuth({
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
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60 * 60, // 2 hours
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
  plugins: [
    multiSession(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          successUrl: "/a/user/tab/billing?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
      ],
    }),
  ],
});
