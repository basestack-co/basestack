// Prisma

// Types
import { Role } from ".prisma/client";
// Utils
import { type AppEnv, Product, config as utilsConfig } from "@basestack/utils";
import { getDb } from "server/db";
import { AppMode } from "utils/helpers/general";

const { urls } = utilsConfig;

export const productUrl = urls.getAppWithEnv(Product.FLAGS, AppMode as AppEnv);

export const getProjectOnUser = async (projectKey: string) => {
  const prisma = getDb();

  const [current, admin] = await prisma.$transaction([
    prisma.projectsOnUsers.findFirst({
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
          },
        },
      },
    }),
    prisma.projectsOnUsers.findFirst({
      where: {
        role: Role.ADMIN,
        project: {
          key: projectKey,
        },
      },
      select: {
        userId: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    }),
  ]);

  if (!current) {
    return null;
  }

  return {
    ...current?.project,
    userId: current?.user.id,
    adminUserId: admin?.userId ?? "",
    adminUserEmail: admin?.user.email ?? "",
  };
};
