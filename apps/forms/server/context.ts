// Libs
import prisma from "libs/prisma";
// Types
import type { NextRequest } from "next/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
// Server
import * as trpc from "@trpc/server";
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

export const createContext = async (req: NextRequest) => {
  const { auth } = await createAuthContext({ auth: getAuth(req) });

  return {
    req,
    prisma,
    auth,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
