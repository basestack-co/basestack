import type { NextAuthOptions } from "next-auth";
// Providers
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
// Adapters
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// Libs
import { prisma } from "libs/prisma";
// Types
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: Role;
    };
  }

  interface User {
    role?: Role;
  }
}

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  providers: [
    ...(process.env.GITHUB_CLIENT_ID
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile) {
              return {
                id: profile.id.toString(),
                name: profile.name || profile.login,
                gh_username: profile.login,
                email: profile.email,
                image: profile.avatar_url,
              };
            },
          }),
        ]
      : []),
    ...(process.env.AUTH0_CLIENT_ID
      ? [
          Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: `https://${process.env.AUTH0_DOMAIN}`,
            profile: (profile) => {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              };
            },
          }),
        ]
      : []),
    ...(process.env.GOOGLE_CLIENT_ID
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
              },
            },
            profile: (profile) => {
              return {
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
              };
            },
          }),
        ]
      : []),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.name,
        role: user.role,
      },
    }),
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const email = message.user.email as string;
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            name: true,
            createdAt: true,
          },
        });

        const isNewUserRecently =
          user?.createdAt &&
          new Date(user.createdAt).getTime() > Date.now() - 10000;

        if (isNewUserRecently) {
          // TODO: Trigger a background job to send a welcome email
        }
      }
    },
  },
};
