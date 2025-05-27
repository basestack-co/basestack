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
import { config, Product, AppEnv, emailToId } from "@basestack/utils";
// Vendors
import { qstash, polar } from "@basestack/vendors";

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
            const customerExternalId = emailToId(user.email);

            // Create customer in Polar
            await polar.client.customers.create({
              email: user.email,
              name: user.name,
              externalId: customerExternalId,
            });

            // Send welcome email
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
