"use client";

import React, { useCallback, useMemo } from "react";
// UI
import { Plans } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Libs
import { authClient } from "libs/auth/client";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";
// Tanstack
import { useMutation, useQuery } from "@tanstack/react-query";

const UserProfileBillingPage = () => {
  const t = useTranslations("profile");

  const { data: session } = authClient.useSession();

  const { data, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ["polar-customer-state"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });

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

  const currentSubscription = useMemo(() => {
    if (!data) return null;

    const sub = data.activeSubscriptions.find(
      ({ metadata }: { metadata: { product: string } }) =>
        metadata.product === Product.FLAGS,
    );

    if (!sub) return null;

    return {
      id: sub?.id ?? "",
      planId: sub?.metadata.planId ?? "",
      status: sub?.status ?? "",
      amount: sub?.amount ?? 0,
      currency: sub?.currency ?? "",
      recurringInterval: sub?.recurringInterval ?? "month",
      currentPeriodStart: sub?.currentPeriodStart ?? "",
      currentPeriodEnd: sub?.currentPeriodEnd ?? "",
    };
  }, [data]);

  const currentPlan = useMemo(() => {
    const plan = config.plans.getPlan(
      Product.FLAGS,
      currentSubscription?.planId ?? PlanTypeId.FREE,
    );

    const amount =
      currentSubscription?.recurringInterval === "month"
        ? plan.price.monthly.amount
        : plan.price.yearly.amount;

    return {
      name: plan.name,
      amount: amount,
      country: data?.billingAddress?.country ?? "",
    };
  }, [currentSubscription, data]);

  const onCreateFlagsCheckout = useCallback(
    async (
      planId: PlanTypeId,
      interval: "monthly" | "yearly",
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const productsEnv = config.plans.getPlanProducts(Product.FLAGS, planId)[
        AppMode === "production" ? "production" : "sandbox"
      ];
      const products =
        interval === "yearly" ? productsEnv.slice().reverse() : productsEnv;

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
          <Plans
            product="feature-flags"
            isLoadingSubscription={isLoadingSubscription}
            onCreateCheckoutCallback={onCreateFlagsCheckout}
            onCreatePortalCallback={onCreateFlagsPortal}
            currentPlan={currentPlan}
            recurringInterval={currentSubscription?.recurringInterval ?? ""}
            subStatus={currentSubscription?.status ?? ""}
            subRenewsAt={currentSubscription?.currentPeriodEnd ?? ""}
            hasActivePlan={!!currentSubscription}
          />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default UserProfileBillingPage;
