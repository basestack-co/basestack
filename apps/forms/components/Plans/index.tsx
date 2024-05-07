import React, { Fragment, useCallback, useState } from "react";
// Server
import { trpc } from "libs/trpc";
// Store
import { useStore } from "store";
// Locales
import useTranslation from "next-translate/useTranslation";
// Toast
import { toast } from "sonner";
// Utils
import { config, PlanTypeId, getBrowserUrl } from "@basestack/utils";
// Components
import { useTheme } from "styled-components";

const Plans = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useStore((state) => state.isDarkMode);

  const { data, isLoading: isLoadingSubscription } =
    trpc.subscription.current.useQuery(undefined, {
      enabled: true,
    });
  const createCheckout = trpc.subscription.checkout.useMutation();

  const onHandleExternalUrl = useCallback((url?: string) => {
    if (url) {
      window.location.href = `${url}`;
    }
  }, []);

  const onCreateCheckout = useCallback(
    (planId: PlanTypeId, interval: "monthly" | "yearly") => {
      setIsLoading(true);
      createCheckout.mutate(
        {
          planId,
          interval,
          isDarkMode,
          redirectUrl: `${getBrowserUrl()}/user/profile/settings`,
        },
        {
          onSuccess: (result) => {
            if (result.error) {
              toast.error(result.error.message);
            }

            if (result.statusCode === 201 && result.url) {
              toast.success("Redirecting to checkout...");
              onHandleExternalUrl(result.url);
            }
          },
          onError: (error) => {
            setIsLoading(false);
            toast.error(error.message);
          },
        },
      );
    },
    [createCheckout, isDarkMode, onHandleExternalUrl],
  );

  if (isLoadingSubscription) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        <h4>No subscription found</h4>
        <hr />
        <ul>
          {config.plans.forms
            .filter((item) => item.id !== PlanTypeId.FREE)
            .map((plan) => {
              return (
                <Fragment key={plan.id}>
                  <li>Plan Id: {plan.id}</li>
                  <li>
                    <button
                      disabled={isLoading}
                      onClick={() => onCreateCheckout(plan.id, "monthly")}
                    >
                      Select plan
                    </button>
                  </li>
                </Fragment>
              );
            })}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h4>Current Subscription</h4>
      <hr />
      <ul>
        <li>Product ID: {data.product.id}</li>
        <li>Product Name: {data.product.name}</li>
        <li>Status: {data.status}</li>
        <li>Card Brand: {data.card.brand}</li>
        <li>Card Last Four: {data.card.lastFour}</li>
        <li>
          <button onClick={() => onHandleExternalUrl(data.urls.customerPortal)}>
            Manage Subscription
          </button>
        </li>
        <li>
          <br />
        </li>
        <li>
          <button
            onClick={() => onHandleExternalUrl(data.urls.updatePaymentMethod)}
          >
            Update Payment Method
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Plans;
