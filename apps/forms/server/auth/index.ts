// Auth
import NextAuth from "next-auth";
// Utils
import { cache } from "react";
// DB
import { prisma } from "server/db";
// Vendors
import { PrismaAdapter } from "@auth/prisma-adapter";
import { auth as authVendor } from "@basestack/vendors";

const authConfig = authVendor.createAuthConfig({
  product: "Forms",
  adapter: PrismaAdapter(prisma),
  getUser: async (email) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        name: true,
        createdAt: true,
      },
    });

    return {
      name: user?.name ?? "User",
      createdAt: user?.createdAt ?? new Date(),
    };
  },
  content: {
    emails: {
      welcome: {
        title: "Welcome to Basestack Forms",
        description:
          "Welcome to Basestack Forms, the platform that elevates your website with powerful, customizable forms.",
        link: "https://forms.basestack.co",
      },
    },
  },
});

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
