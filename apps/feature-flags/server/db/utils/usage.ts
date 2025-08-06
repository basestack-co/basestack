import type { Prisma, PrismaClient } from ".prisma/client";
import type { DefaultArgs } from ".prisma/client/runtime/library";
import type { FlagsPlan } from "@basestack/utils";
// tRPC
import { TRPCError } from "@trpc/server";

export const withUsageUpdate = async (
  prisma:
    | PrismaClient
    | Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        | "$connect"
        | "$disconnect"
        | "$on"
        | "$transaction"
        | "$use"
        | "$extends"
      >,
  userId: string,
  limit: keyof FlagsPlan["limits"],
  action: "increment" | "decrement",
  value: number = 1
) => {
  try {
    return await prisma.usage.upsert({
      // Create a new subscription if it doesn't exist with the free plan
      create: {
        userId,
        [limit]: 1,
      },
      // Increment or decrement the limit
      update: {
        [limit]: {
          [action]: value,
        },
      },
      where: {
        userId,
      },
    });
  } catch {
    throw new TRPCError({ code: "BAD_REQUEST" });
  }
};
