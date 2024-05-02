import { PrismaClient } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";

export const getSubscriptionUsage = async (
  prisma: PrismaClient,
  userId: string,
) => {
  try {
    return await prisma.$transaction(async (tx) => {
      return prisma.usage.findFirst({
        where: {
          userId,
        },
        omit: {
          updatedAt: true,
          createdAt: true,
        },
      });
    });
  } catch {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
};
