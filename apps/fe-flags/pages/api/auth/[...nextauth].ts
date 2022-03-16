import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { verifyPassword, hashPassword } from "libs/auth/passwords";
import prisma from "libs/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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

    /* CredentialsProvider({
      id: "email-password",
      name: "Login with Email and Password",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        try {
          const select = {
            id: true,
            email: true,
            password: true,
            name: true,
            image: true,
          };

          let findUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select,
          });

          if (!findUser) {
            if (!credentials.password || !credentials.email) {
              throw new Error("Invalid Credentials");
            }

            findUser = await prisma.user.create({
              data: {
                email: credentials.email,
                password: await hashPassword(credentials.password),
              },
              select,
            });
          } else {
            const isValid = await verifyPassword(
              credentials.password,
              findUser.password
            );

            if (!isValid) {
              throw new Error("Invalid Credentials");
            }
          }

          return {
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            image: findUser.image,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }), */
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.username,
      },
    }),
  },
};

export default NextAuth(authOptions);
