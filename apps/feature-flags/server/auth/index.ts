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
import { qstash } from "@basestack/vendors";
// Payments
import {
  polar,
  checkout,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
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
        /* webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
          onSubscriptionCreated: async (payload) => {
            console.log("onSubscriptionCreated ", payload.customer.id);

            await createOrUpdateSubscription({
              prisma,
              event: payload.type,
              userId: payload.metadata.userId,
              planId: payload.metadata.planId,
              subscriptionId: payload.id,
              customerId: payload.customer.id,
              productId: payload.product.id,
              status: payload.status,
              renewsAt: payload.started_at,
              endsAt: payload.ended_at,
              cancelled: false,
            });
          },
          onSubscriptionUpdated: async (payload) => {
            console.log("onSubscriptionUpdated ", payload);

            await createOrUpdateSubscription({
              prisma,
              event: payload.type,
              userId: payload.metadata.userId,
              planId: payload.metadata.planId,
              subscriptionId: payload.id,
              customerId: payload.customer.id,
              productId: payload.product.id,
              status: payload.status,
              renewsAt: payload.started_at,
              endsAt: payload.ended_at,
              cancelled: false,
            });
          },
          onSubscriptionCanceled: async (payload) => {
            console.log("onSubscriptionCanceled ", payload);

            await createOrUpdateSubscription({
              prisma,
              event: payload.type,
              userId: payload.metadata.userId,
              planId: payload.metadata.planId,
              subscriptionId: payload.id,
              customerId: payload.customer.id,
              productId: payload.product.id,
              status: payload.status,
              renewsAt: payload.started_at,
              endsAt: payload.ended_at,
              cancelled: true,
            });
          },
        }), */
      ],
    }),
  ],
});
