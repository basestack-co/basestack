// Auth
import { betterAuth } from "better-auth";
// Adapters
import { prismaAdapter } from "better-auth/adapters/prisma";
// Utils
import { AppMode } from "utils/helpers/general";
import { config, Product, AppEnv } from "@basestack/utils";
// DB
import { prisma } from "../db";
// Vendors
import { auth as authVendor } from "@basestack/vendors";

/* 
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

*/

export const auth: ReturnType<typeof betterAuth> = authVendor.createAuthServer({
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
