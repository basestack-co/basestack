"use client";

import React, { useCallback, useMemo } from "react";
// UI
import { UsagePlan } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Libs
import { authClient } from "libs/auth/client";
// Vendors
// import { redis } from "@basestack/vendors";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";
// Tanstack
import { useMutation } from "@tanstack/react-query";
// API
import { api } from "utils/trpc/react";

const UserProfileBillingPage = () => {
  const t = useTranslations("profile");
  const { data: session } = authClient.useSession();

  const { data, isLoading } = api.usage.subscription.useQuery();

  const createCheckout = useMutation({
    mutationFn: (payload: {
      products: string[];
      metadata: Record<string, string>;
    }) => {
      return authClient.checkout({
        products: payload.products,
        metadata: payload.metadata,
      });
    },
  });

  const createPortal = useMutation({
    mutationFn: () => {
      return authClient.customer.portal();
    },
  });

  const currentPlan = useMemo(() => {
    const plan = config.plans.getPlan(Product.FLAGS, PlanTypeId.USAGE);

    const amount =
      data?.recurringInterval === "month"
        ? plan.price.monthly.amount
        : plan.price.yearly.amount;

    return {
      name: plan.name,
      amount: amount,
      country: data?.country ?? "",
    };
  }, [data]);

  const onCreateFlagsCheckout = useCallback(
    async (
      planId: PlanTypeId,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const products = config.plans.getPlanProducts(Product.FLAGS, planId)[
        AppMode === "production" ? "production" : "sandbox"
      ];

      console.log(
        "`subscription:${session?.user.id}`",
        `subscription:${session?.user.id}`,
      );

      //  await redis.client.del(`subscription:${session?.user.id}`);

      createCheckout.mutate(
        {
          products,
          metadata: {
            userId: session?.user.id!,
            product: Product.FLAGS,
            planId,
          },
        },
        {
          onSuccess: (result) => {
            let toastId: string | number = "";

            if (result.error) {
              setIsLoading(false);
              toast.error(result.error.message);
            }

            if (!!result.data) {
              toastId = toast.loading(
                t("billing.status.checkout.redirect.loading"),
              );

              setTimeout(() => {
                setIsLoading(false);
                toast.dismiss(toastId);
              }, 10000);
            }
          },
          onError: (error) => {
            setIsLoading(false);
            toast.error(error.message);
          },
        },
      );
    },
    [createCheckout, session?.user.id, t],
  );

  const onCreateFlagsPortal = useCallback(
    async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      // await redis.client.del(`subscription:${session?.user.id}`);

      createPortal.mutate(undefined, {
        onSuccess: (result) => {
          let toastId: string | number = "";

          if (result.error) {
            setIsLoading(false);
            toast.error(result.error.message);
          }

          if (!!result.data) {
            toastId = toast.loading(
              t("billing.status.portal.redirect.loading"),
            );

            setTimeout(() => {
              setIsLoading(false);
              toast.dismiss(toastId);
            }, 10000);
          }
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.message);
        },
      });
    },
    [createPortal, t],
  );

  return (
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <UsagePlan
            product={Product.FLAGS}
            isLoadingSubscription={isLoading}
            onCreateCheckoutCallback={onCreateFlagsCheckout}
            onCreatePortalCallback={onCreateFlagsPortal}
            currentPlan={currentPlan}
            recurringInterval={data?.recurringInterval ?? ""}
            subStatus={data?.status ?? ""}
            subRenewsAt={data?.currentPeriodEnd ?? ""}
            hasActivePlan={data?.status === "active"}
          />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default UserProfileBillingPage;
