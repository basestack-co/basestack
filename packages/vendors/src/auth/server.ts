// Auth

// import { client as redis } from "../redis";
// Utils
import type { AppEnv, Product } from "@basestack/utils";
import { type Adapter, type BetterAuthOptions, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
// Plugins
import { multiSession } from "better-auth/plugins";
// Vendors
import { createCustomerIfNotExists } from "../polar";
import { events as qstashEvents } from "../qstash";

export interface CreateAuthServerProps {
  product: Product;
  env: AppEnv;
  database: (options: BetterAuthOptions) => Adapter;
  welcomeEmail: {
    subject: string;
    content: {
      title: string;
      description: string;
      link: string;
    };
  };
}

export const createAuthServer = ({
  // product,
  // env,
  database,
  welcomeEmail,
}: CreateAuthServerProps): ReturnType<typeof betterAuth> => {
  return betterAuth({
    database,
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
    /* secondaryStorage: {
      get: async (id) => {
        const key = `${env}:${product}:auth:${id}`;
        const value = await redis.get<string>(key);
        if (!value) return null;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },
      set: async (id, value, ttl) => {
        const key = `${env}:${product}:auth:${id}`;
        const stringValue =
          typeof value === "string" ? value : JSON.stringify(value);
        if (ttl) await redis.set(key, stringValue, { ex: ttl });
        else await redis.set(key, stringValue);
      },
      delete: async (id) => {
        const key = `${env}:${product}:auth:${id}`;

        await redis.del(key);
      },
    }, */
    hooks: {
      after: createAuthMiddleware(async (ctx) => {
        if (ctx?.context?.newSession) {
          const { user } = ctx.context.newSession;
          const createdAt = user?.createdAt;

          // Check if user was created in the last 10 seconds
          const isNewUserRecently =
            createdAt && new Date(createdAt).getTime() > Date.now() - 10000;

          if (isNewUserRecently && user?.email && user?.name) {
            const { email, name } = user;

            try {
              await qstashEvents.sendEmailEvent({
                template: "welcome",
                to: [email],
                subject: welcomeEmail.subject,
                props: {
                  content: {
                    ...welcomeEmail.content,
                    name,
                  },
                },
              });

              await createCustomerIfNotExists(name, email);
            } catch (error) {
              console.error(
                "Error creating customer in Polar or sending welcome email",
                error,
              );
            }
          }
        }
      }),
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
};
