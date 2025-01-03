// DB
import { prisma } from "server/db";
// Utils
import { config as utilsConfig, PlanTypeId } from "@basestack/utils";

const { urls } = utilsConfig;

export const defaultSuccessUrl = `${urls.app.production.forms}/status/success`;
export const defaultErrorUrl = `${urls.app.production.forms}/status/error`;

export const getFormOnUser = async (formId: string, referer: string) => {
  const current = await prisma.formOnUsers.findFirst({
    where: {
      formId: formId,
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
          subscription: {
            select: {
              planId: true,
              submissions: true,
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
    ...current?.form,
    redirectUrl: current?.form.redirectUrl || referer,
    successUrl: current?.form.successUrl || defaultSuccessUrl,
    errorUrl: current?.form.errorUrl || defaultErrorUrl,
    userId: current?.user.id,
    usage: current?.user.subscription || {
      planId: PlanTypeId.FREE,
      submissions: 0,
    },
  };
};
