"use client";

import React, { useCallback, useMemo } from "react";
// UI
import { UsagePlan } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";
// Vendors
import { auth } from "@basestack/vendors";

const UserProfileBillingPage = () => {
  const t = useTranslations("profile");
  const { data: session } = auth.client.useSession();

  const { data, isLoading } = api.subscription.current.useQuery();

  const createCheckout = api.subscription.checkout.useMutation();
  const createPortal = api.subscription.portal.useMutation();

  const currentPlan = useMemo(() => {
    const plan = config.plans.getPlan(Product.FORMS, PlanTypeId.USAGE);

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

  const onCreateFormsCheckout = useCallback(
    async (
      planId: PlanTypeId,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const products = config.plans.getPlanProducts(Product.FORMS, planId)[
        AppMode === "production" ? "production" : "sandbox"
      ];

      createCheckout.mutate(
        {
          products,
          metadata: {
            userId: session?.user.id!,
            product: Product.FORMS,
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

  const onCreateFormsPortal = useCallback(
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
            product={Product.FORMS}
            isLoadingSubscription={isLoading}
            onCreateCheckoutCallback={onCreateFormsCheckout}
            onCreatePortalCallback={onCreateFormsPortal}
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
