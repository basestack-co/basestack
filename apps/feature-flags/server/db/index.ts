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
