// Prisma
import prisma from "..";

const selectFlagFields = {
  slug: true,
  enabled: true,
  payload: true,
  expiredAt: true,
  description: true,
  createdAt: true,
  updatedAt: true,
};

// Gets all the flags by project slug and env slug
export const getAllFlagsBySlugs = async (projectKey: string, envKey: string) =>
  await prisma.flag.findMany({
    where: {
      environment: {
        key: envKey,
        project: {
          key: projectKey,
        },
      },
    },
    select: selectFlagFields,
    orderBy: {
      createdAt: "desc",
    },
  });

export const getFlagBySlug = async (
  projectKey: string,
  envKey: string,
  slug: string,
) =>
  await prisma.flag.findFirst({
    where: {
      slug,
      environment: {
        key: envKey,
        project: {
          key: projectKey,
        },
      },
    },
    select: selectFlagFields,
  });
