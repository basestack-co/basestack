// DB
import { prisma } from "server/db";
// Types
import { Role } from ".prisma/client";
// Utils
import { AppEnv, config as utilsConfig, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";

const { urls } = utilsConfig;

const productUrl = urls.getAppWithEnv(Product.FORMS, AppMode as AppEnv);

export const defaultSuccessUrl = `${productUrl}/status/success`;
export const defaultErrorUrl = `${productUrl}/status/error`;

export const getFormOnUser = async (formId: string, referer: string) => {
  const [current, admin] = await prisma.$transaction([
    prisma.formOnUsers.findFirst({
      where: {
        formId,
      },
      select: {
        form: {
          omit: {
            createdAt: true,
            updatedAt: true,
            id: true,
            rules: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    }),
    prisma.formOnUsers.findFirst({
      where: {
        formId,
        role: Role.ADMIN,
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
    ...current?.form,
    redirectUrl: current?.form.redirectUrl || referer,
    successUrl: current?.form.successUrl || defaultSuccessUrl,
    errorUrl: current?.form.errorUrl || defaultErrorUrl,
    userId: current?.user.id,
    adminUserId: admin?.userId ?? "",
    adminUserEmail: admin?.user.email ?? "",
  };
};
