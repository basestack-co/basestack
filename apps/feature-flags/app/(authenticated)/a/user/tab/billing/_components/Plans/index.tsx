import React, { useCallback, useState } from "react";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// Toast
import { toast } from "sonner";
// Utils
import {
  config,
  PlanTypeId,
  getBrowserUrl,
  formatNumber,
} from "@basestack/utils";
import dayjs from "dayjs";
// Types
import { BillingInterval } from "./types";
// Components
import { Text, Skeleton } from "@basestack/design-system";
import PlanCard from "./PlanCard";
import UpgradePlanHeader from "./UpgradePlanHeader";
import ActivePlan from "./ActivePlan";
import { useTheme } from "styled-components";
import { Container, List, ListItem } from "./styles";

const freePlanLimits = config.plans.getFlagsPlanLimits(PlanTypeId.FREE);
const freePlanFeatures = config.plans.getFlagsPlanFeatures(PlanTypeId.FREE);

const Plans = () => {
  const t = useTranslations("profile");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const isDarkMode = useStore((state) => state.isDarkMode);

  const { data, isLoading: isLoadingSubscription } =
    api.subscription.current.useQuery(undefined, {
      enabled: true,
    });

  const createCheckout = api.subscription.checkout.useMutation();

  const onHandleExternalUrl = useCallback((url?: string) => {
    if (url) {
      window.location.href = `${url}`;
    }
  }, []);

  const onCreateCheckout = useCallback(
    (planId: PlanTypeId) => {
      setIsLoading(true);
      createCheckout.mutate(
        {
          planId,
          interval,
          isDarkMode,
          redirectUrl: `${getBrowserUrl()}/user/profile/billing`,
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
    [createCheckout, interval, isDarkMode, onHandleExternalUrl],
  );

  if (isLoadingSubscription) {
    return (
      <Skeleton
        numberOfItems={1}
        items={[
          { h: 24, w: "80px", mb: 8 },
          { h: 18, w: "40%" },
        ]}
        padding="20px"
      />
    );
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
            t("billing.feature.projects", {
              value: formatNumber(freePlanLimits.projects),
            }),
            t("billing.feature.flags", {
              value: formatNumber(freePlanLimits.flags),
            }),
            t("billing.feature.environments", {
              value: formatNumber(freePlanLimits.environments),
            }),
            t("billing.feature.members", {
              value: formatNumber(freePlanLimits.members),
            }),
            t("billing.feature.has-history", {
              value: freePlanFeatures.hasHistory ? "✔️" : "✖️",
            }),
            t("billing.feature.has-remote-config", {
              value: freePlanFeatures.hasRemoteConfig ? "✔️" : "✖️",
            }),
            t("billing.feature.has-security", {
              value:
                freePlanFeatures.hasWebsites || freePlanFeatures.hasBlockIPs
                  ? "✔️"
                  : "✖️",
            }),
          ]}
          amount={{
            symbol: t("billing.price.symbol"),
            abbr: t("billing.price.abbr"),
            value: 0,
            cycle: t("billing.cycle-abbr.monthly"),
          }}
          isDisabled={isLoading}
        />
        <UpgradePlanHeader
          onSelectCycle={(value) => setInterval(value)}
          mt={theme.spacing.s7}
        />
        <List>
          {config.plans.flags
            .filter((item) => item.id !== PlanTypeId.FREE)
            .map(({ id, price, limits, features }) => {
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
                      t("billing.feature.projects", {
                        value: formatNumber(limits.projects),
                      }),
                      t("billing.feature.flags", {
                        value: formatNumber(limits.flags),
                      }),
                      t("billing.feature.environments", {
                        value: formatNumber(limits.environments),
                      }),
                      t("billing.feature.members", {
                        value: formatNumber(limits.members),
                      }),
                      t("billing.feature.has-history", {
                        value: features.hasHistory ? "✔️" : "✖️",
                      }),
                      t("billing.feature.has-remote-config", {
                        value: features.hasRemoteConfig ? "✔️" : "✖️",
                      }),
                      t("billing.feature.has-security", {
                        value:
                          features.hasWebsites || features.hasBlockIPs
                            ? "✔️"
                            : "✖️",
                      }),
                    ]}
                    amount={{
                      value,
                      description,
                      cycle: t("billing.cycle-abbr.monthly"),
                      symbol: t("billing.price.symbol"),
                      abbr: t("billing.price.abbr"),
                    }}
                    onClick={() => onCreateCheckout(id)}
                    isDisabled={isLoading}
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
      <ActivePlan
        variantId={data.product.variantId}
        isActive={data.status === "active"}
        isBilledMonthly={data.product.variant === "Monthly"}
        renewsAt={dayjs(data.renewsAt).format("MMMM D, YYYY") ?? ""}
        cardBrand={data.card.brand ?? ""}
        cardLastFour={data.card.lastFour ?? ""}
        onManage={() => onHandleExternalUrl(data.urls.customerPortal)}
        onUpdate={() => onHandleExternalUrl(data.urls.updatePaymentMethod)}
      />
    </Container>
  );
};

export default Plans;
