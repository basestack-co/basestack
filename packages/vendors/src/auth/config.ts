// Types
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import type { Adapter } from "@auth/core/adapters";
// Providers
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
// Events
import { sendEmailEvent } from "../qstash/events";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role?: Role;
  }
}

export const providers: Provider[] = [
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
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export interface ContentType {
  [key: string]: string | undefined | null;
}

export interface CreateAuthConfigArgs {
  product: string;
  adapter: Adapter;
  getUser?: (email: string) => Promise<{ name: string; createdAt: Date }>;
  content: {
    emails: {
      welcome: ContentType;
    };
  };
}

export const createAuthConfig = ({
  product,
  adapter,
  getUser,
  content,
}: CreateAuthConfigArgs) => {
  const authConfig: NextAuthConfig = {
    adapter,
    secret: process.env.AUTH_SECRET,
    pages: {
      signIn: "/auth/sign-in",
      signOut: "/auth/sign-out",
      error: "/auth/error", // Error code passed in query string as ?error=
      verifyRequest: "/auth/verify-request", // (used for check email message)
    },
    providers,
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
        const email = message.user.email as string;

        if (message.isNewUser && getUser) {
          const user = await getUser(email);

          const isNewUserRecently =
            user?.createdAt &&
            new Date(user.createdAt).getTime() > Date.now() - 10000;

          if (isNewUserRecently) {
            await sendEmailEvent({
              template: "welcome",
              to: [email],
              subject: `Welcome to Basestack ${product}`,
              props: {
                content: {
                  name: user.name,
                  ...content.emails.welcome,
                },
              },
            });
          }
        }
      },
    },
  };

  return authConfig;
};
