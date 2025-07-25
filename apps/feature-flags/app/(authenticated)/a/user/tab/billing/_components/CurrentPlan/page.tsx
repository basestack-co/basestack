"use client";

// UI
import { UsagePlan } from "@basestack/ui";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
// Vendors
import { auth } from "@basestack/vendors";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback, useMemo } from "react";
// Toast
import { toast } from "sonner";
import { AppMode } from "utils/helpers/general";
// Server
import { api } from "utils/trpc/react";

interface CurrentPlanProps {
  isLoadingSubscription: boolean;
  recurringInterval: string;
  status: string;
  currentPeriodEnd: string;
  country: string;
}

const CurrentPlan = ({
  isLoadingSubscription,
  recurringInterval,
  status,
  currentPeriodEnd,
  country,
}: CurrentPlanProps) => {
  const t = useTranslations("profile");
  const { data: session } = auth.client.useSession();

  const createCheckout = api.subscription.checkout.useMutation();
  const createPortal = api.subscription.portal.useMutation();

  const currentPlan = useMemo(() => {
    const plan = config.plans.getPlan(Product.FLAGS, PlanTypeId.USAGE);

    const amount =
      recurringInterval === "month"
        ? plan.price.monthly.amount
        : plan.price.yearly.amount;

    return {
      name: plan.name,
      amount: amount,
      country: country ?? "",
    };
  }, [country, recurringInterval]);

  const onCreateCheckout = useCallback(
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

            if (result.checkout.url) {
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

  const onCreatePortal = useCallback(
    async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
      createPortal.mutate(undefined, {
        onSuccess: (result) => {
          let toastId: string | number = "";

          if (result.portal.url) {
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
    <UsagePlan
      product={Product.FLAGS}
      isLoadingSubscription={isLoadingSubscription}
      onCreateCheckoutCallback={onCreateCheckout}
      onCreatePortalCallback={onCreatePortal}
      currentPlan={currentPlan}
      recurringInterval={recurringInterval}
      subStatus={status}
      subRenewsAt={currentPeriodEnd}
      hasActivePlan={status === "active"}
    />
  );
};

export default CurrentPlan;
