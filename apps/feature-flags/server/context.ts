// Libs
import prisma from "libs/prisma";
// Server
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
// Auth
import { authOptions } from "libs/auth/authOptions";
import { unstable_getServerSession } from "next-auth/next";

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
