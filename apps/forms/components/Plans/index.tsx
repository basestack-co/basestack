import React, { useCallback, useState } from "react";
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
// Types
import { BillingInterval } from "./types";
// Components
import { Text } from "@basestack/design-system";
import PlanCard from "./PlanCard";
import UpgradePlanHeader from "./UpgradePlanHeader";
import { useTheme } from "styled-components";
import { Container, List, ListItem } from "./styles";

const Plans = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("monthly");
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
    (planId: PlanTypeId, interval: BillingInterval) => {
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
      <Container>
        <Text mb={theme.spacing.s4} size="large">
          {t("billing.plan.current.title")}
        </Text>
        <PlanCard
          title={t("billing.plan.free")}
          features={[
            t("billing.feature.submission", { value: 200 }),
            t("billing.feature.users", { value: 2 }),
            t("billing.feature.forms", { value: 2 }),
          ]}
          amount={{
            symbol: t("billing.price.symbol"),
            abbr: t("billing.price.abbr"),
            value: 0,
            cycle: t("billing.cycle-abbr.monthly"),
          }}
        />
        <UpgradePlanHeader
          onSelectCycle={(value) => setInterval(value)}
          mt={theme.spacing.s7}
        />
        <List>
          {config.plans.forms
            .filter((item) => item.id !== PlanTypeId.FREE)
            .map(({ id, price }) => {
              const value =
                interval === "monthly"
                  ? price.monthly.amount
                  : price.yearly.amount;
              const description =
                interval === "monthly"
                  ? t("billing.cycle.monthly")
                  : t("billing.cycle.yearly");
              return (
                <ListItem key={id}>
                  <PlanCard
                    title={id}
                    features={[
                      t("billing.feature.submission", { value: 200 }),
                      t("billing.feature.users", { value: 2 }),
                      t("billing.feature.forms", { value: 2 }),
                    ]}
                    amount={{
                      value,
                      description,
                      cycle: t("billing.cycle-abbr.monthly"),
                      symbol: t("billing.price.symbol"),
                      abbr: t("billing.price.abbr"),
                    }}
                    onClick={() => onCreateCheckout(id, "monthly")}
                  />
                </ListItem>
              );
            })}
        </List>
      </Container>
    );
  }

  return (
    <Container>
      <Text mb={theme.spacing.s4} size="large">
        {t("billing.plan.current.title")}
      </Text>
      <br /> <br />
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
    </Container>
  );
};

export default Plans;
