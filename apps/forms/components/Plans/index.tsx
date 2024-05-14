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
import { Text, Switch } from "@basestack/design-system";
import PlanCard from "./PlanCard";
import { useTheme } from "styled-components";
import { List, ListItem } from "./styles";

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
        <Text mb={theme.spacing.s4} size="large">
          Current Plan
        </Text>
        <PlanCard
          title="free plan"
          features={["200 submissions", "1 user", "2 forms"]}
          amount={{ value: "$0", abbr: "USD", cycle: "mo" }}
        />
        <Text mb={theme.spacing.s1} mt={theme.spacing.s7} size="large">
          Upgrade Plan
        </Text>
        <Switch
          checked
          text="Switch to yearly billing"
          onChange={() => null}
          mb={theme.spacing.s4}
        />
        <List>
          {config.plans.forms
            .filter((item) => item.id !== PlanTypeId.FREE)
            .map((plan) => {
              return (
                <ListItem key={plan.id}>
                  <PlanCard
                    title={plan.id}
                    features={["200 submissions", "1 user", "2 forms"]}
                    amount={{
                      value: `$${plan.price.monthly.amount}`,
                      abbr: plan.price.monthly.currency,
                      cycle: "mo",
                      description: "billed yearly",
                    }}
                    onClick={() => onCreateCheckout(plan.id, "monthly")}
                  />
                </ListItem>
              );
            })}
        </List>
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
        <li>Variant ID: {data.product.variantId}</li>
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
