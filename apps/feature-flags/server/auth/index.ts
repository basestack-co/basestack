// Auth
import NextAuth from "next-auth";
// Utils
import React, { cache } from "react";
// DB
import { prisma } from "server/db";
// Vendors
import { PrismaAdapter } from "@auth/prisma-adapter";
import { auth as authVendor } from "@basestack/vendors";

const authConfig = authVendor.createAuthConfig({
  product: "Feature Flags",
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
        title: "Welcome to Basestack Feature Flags",
        description:
          "Welcome to BaseStack Feature Flags, the ultimate solution for seamlessly managing feature rollouts. Effortlessly toggle features, run A/B tests, and deploy updates with confidence—all without redeploying your code. 🚀",
        link: "https://flags.basestack.co",
      },
    },
  },
});

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
