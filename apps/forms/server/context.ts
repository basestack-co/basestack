// Libs
import prisma from "libs/prisma";
// Server
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
// Auth
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server";

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createAuthContext = async ({ auth }: AuthContext) => {
  return {
    auth,
  };
};

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const { auth } = await createAuthContext({ auth: getAuth(req) });

  return {
    req,
    res,
    prisma,
    auth,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
