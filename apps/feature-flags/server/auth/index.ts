// Auth
import { betterAuth } from "better-auth";
// DB
import { prisma } from "../db";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Plugins
import { multiSession } from "better-auth/plugins";
// Utils
import { AppMode } from "../../utils/helpers/general";
import { config, Product, AppEnv } from "@basestack/utils";
// Vendors
import { qstash, polar } from "@basestack/vendors";
// Payments
import {
  polar as polarPlugin,
  checkout,
  portal,
  usage,
} from "@polar-sh/better-auth";

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
  plugins: [
    multiSession(),
    polarPlugin({
      client: polar.client,
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
