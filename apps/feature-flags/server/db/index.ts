// Types
/* import { PrismaClient } from ".prisma/client";

const createPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; */

// React
import { cache } from "react";
// Prisma
import { PrismaClient } from ".prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export const getDb = cache((): PrismaClient => {
  const connectionString = process.env.DATABASE_URL ?? "";
  const adapter = new PrismaPg({ connectionString, maxUses: 1 });

  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  return prisma;
});
