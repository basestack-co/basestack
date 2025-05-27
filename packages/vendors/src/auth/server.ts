// Auth
import { Adapter, betterAuth, BetterAuthOptions, User } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Plugins
import { multiSession } from "better-auth/plugins";
import { emailToId } from "@basestack/utils";
// Vendors
import { client as polarClient } from "../polar";
import { events as qstashEvents } from "../qstash";

export interface CreateAuthServerProps {
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

const createCustomerIfNotExists = async (user: User) => {
  try {
    const customerExternalId = emailToId(user.email);

    const customer = await polarClient.customerSessions.create({
      customerExternalId,
    });

    if (!customer?.customerId) {
      await polarClient.customers.create({
        email: user.email,
        name: user.name,
        externalId: customerExternalId,
      });
    }
  } catch (error) {
    console.error("Error creating customer in Polar", error, user);
  }
};

export const createAuthServer = ({
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
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            if (user) {
              await createCustomerIfNotExists(user);

              // Send welcome email
              await qstashEvents.sendEmailEvent({
                template: "welcome",
                to: [user.email],
                subject: welcomeEmail.subject,
                props: {
                  content: {
                    ...welcomeEmail.content,
                    name: user.name,
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
};
