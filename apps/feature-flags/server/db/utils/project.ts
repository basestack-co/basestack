// Prisma
import { prisma } from "server/db";
// Utils
import {
  AppEnv,
  config as utilsConfig,
  PlanTypeId,
  Product,
} from "@basestack/utils";
import { AppMode } from "utils/helpers/general";

const { urls } = utilsConfig;

export const productUrl = urls.getAppWithEnv(Product.FLAGS, AppMode as AppEnv);

export const getProjectOnUser = async (projectKey: string) => {
  const current = await prisma.projectsOnUsers.findFirst({
    where: {
      project: {
        key: projectKey,
      },
    },
    select: {
      project: {
        omit: {
          createdAt: true,
          updatedAt: true,
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          subscription: {
            select: {
              planId: true,
              apiRequests: true,
            },
          },
        },
      },
    },
  });

  if (!current) {
    return null;
  }

  return {
    ...current?.project,
    userId: current?.user.id,
    usage: current?.user.subscription || {
      planId: PlanTypeId.FREE,
      apiRequests: 0,
    },
  };
};
