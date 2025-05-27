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
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";
// API
import { api } from "utils/trpc/react";

const UserProfileBillingPage = () => {
  const t = useTranslations("profile");
  const { data: session } = authClient.useSession();

  const { data, isLoading } = api.subscription.current.useQuery();

  console.log("data =", data);

  const createCheckout = api.subscription.checkout.useMutation();
  const createPortal = api.subscription.portal.useMutation();

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

            if (!!result.checkout.url) {
              toastId = toast.loading(
                t("billing.status.checkout.redirect.loading"),
              );

              window.location.href = result.checkout.url;

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

          if (!!result.portal.url) {
            toastId = toast.loading(
              t("billing.status.portal.redirect.loading"),
            );

            window.location.href = result.portal.url;

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
