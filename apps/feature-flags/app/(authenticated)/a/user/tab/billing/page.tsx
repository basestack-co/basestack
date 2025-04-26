"use client";

import React, { useCallback, useMemo } from "react";
// UI
import { Plans } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
// Styles
import { CardListItem, CardList, ProfileCardContainer } from "../styles";

const UserProfileBillingPage = () => {
  const t = useTranslations("profile");
  const isDarkMode = useStore((state) => state.isDarkMode);

  const { data, isLoading: isLoadingSubscription } =
    api.subscription.current.useQuery(undefined, {
      enabled: true,
    });

  const createCheckout = api.subscription.checkout.useMutation();

  const currentPlan = useMemo(
    () =>
      config.plans.getPlanByVariantId(
        Product.FLAGS,
        data?.product?.variantId ?? 0,
        data?.product.variant === "Monthly",
        AppMode,
      ),
    [data],
  );

  const onCreateFlagsCheckout = useCallback(
    (
      planId: PlanTypeId,
      interval: "monthly" | "yearly",
      redirectUrl: string,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      onHandleExternalUrl: (url?: string) => void,
    ) => {
      createCheckout.mutate(
        {
          planId,
          interval,
          isDarkMode,
          redirectUrl,
        },
        {
          onSuccess: (result) => {
            let toastId: string | number = "";

            if (result.error) {
              setIsLoading(false);
              toast.error(result.error.message);
            }

            if (result.statusCode === 201 && result.url) {
              toastId = toast.loading(
                t("billing.status.checkout.redirect.loading"),
              );

              onHandleExternalUrl(result.url);

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
    [createCheckout, isDarkMode, t],
  );

  return (
    <CardList>
      <CardListItem>
        <ProfileCardContainer>
          <Plans
            product="feature-flags"
            isLoadingSubscription={isLoadingSubscription}
            onCreateCheckoutCallback={onCreateFlagsCheckout}
            currentPlan={currentPlan}
            productVariant={data?.product.variant ?? ""}
            cardBrand={data?.card.brand ?? ""}
            cardLastFour={data?.card.lastFour ?? ""}
            subStatus={data?.status ?? ""}
            subRenewsAt={data?.renewsAt ?? ""}
            customerPortalUrl={data?.urls.customerPortal ?? ""}
            updatePaymentMethodUrl={data?.urls.updatePaymentMethod ?? ""}
            hasActivePlan={!!data}
          />
        </ProfileCardContainer>
      </CardListItem>
    </CardList>
  );
};

export default UserProfileBillingPage;
