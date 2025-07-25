// Components
import { Skeleton, Text } from "@basestack/design-system";
// Utils
import {
  config,
  type FlagsPlan,
  type FormPlan,
  formatNumber,
  PlanTypeId,
  Product,
} from "@basestack/utils";
import dayjs from "dayjs";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback, useState } from "react";
// Styles
import { useTheme } from "styled-components";
import ActivePlan, { type CurrentPlan } from "./ActivePlan";
import PlanCard from "./PlanCard";
import { Container, List, ListItem } from "./styles";
// Types
import type { BillingInterval } from "./types";
import UpgradePlanHeader from "./UpgradePlanHeader";

const flagsFreePlanLimits = config.plans.getPlanLimits(
  Product.FLAGS,
  PlanTypeId.FREE,
) as FlagsPlan["limits"];

const flagsFreePlanFeatures = config.plans.getPlanFeatures(
  Product.FLAGS,
  PlanTypeId.FREE,
) as FlagsPlan["features"];

const formsFreePlanLimits = config.plans.getPlanLimits(
  Product.FORMS,
  PlanTypeId.FREE,
) as FormPlan["limits"];

const formsFreePlanFeatures = config.plans.getPlanFeatures(
  Product.FORMS,
  PlanTypeId.FREE,
) as FormPlan["features"];

export interface PlansProps {
  product: "forms" | "feature-flags";
  isLoadingSubscription: boolean;
  onCreateCheckoutCallback: (
    planId: PlanTypeId,
    interval: "monthly" | "yearly",
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  onCreatePortalCallback: (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  currentPlan?: CurrentPlan;
  recurringInterval: string;
  subStatus: string;
  subRenewsAt: string;
  hasActivePlan: boolean;
}

const Plans = ({
  product,
  onCreateCheckoutCallback,
  onCreatePortalCallback,
  isLoadingSubscription,
  currentPlan,
  recurringInterval,
  subStatus,
  subRenewsAt,
  hasActivePlan,
}: PlansProps) => {
  const t = useTranslations("profile");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExternalUrl, setIsLoadingExternalUrl] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  const onCreatePortal = useCallback(() => {
    setIsLoadingExternalUrl(true);

    onCreatePortalCallback(setIsLoadingExternalUrl);
  }, [onCreatePortalCallback]);

  const onCreateCheckout = useCallback(
    (planId: PlanTypeId) => {
      setIsLoading(true);

      onCreateCheckoutCallback(planId, interval, setIsLoading);
    },
    [interval, onCreateCheckoutCallback],
  );

  const getFreeFeatures = useCallback(() => {
    const formatValue = (value: number | boolean) =>
      typeof value === "boolean" ? (value ? "✔️" : "✖️") : formatNumber(value);

    const productFeatures = {
      "feature-flags": {
        "billing.feature.projects": flagsFreePlanLimits.projects,
        "billing.feature.flags": flagsFreePlanLimits.flags,
        "billing.feature.environments": flagsFreePlanLimits.environments,
        "billing.feature.members": flagsFreePlanLimits.members,
        "billing.feature.has-history": flagsFreePlanFeatures.hasHistory,
        "billing.feature.has-remote-config":
          flagsFreePlanFeatures.hasRemoteConfig,
        "billing.feature.has-security":
          flagsFreePlanFeatures.hasWebsites ||
          flagsFreePlanFeatures.hasBlockIPs,
      },
      forms: {
        "billing.feature.forms": formsFreePlanLimits.forms,
        "billing.feature.submissions": formsFreePlanLimits.submissions,
        "billing.feature.members": formsFreePlanLimits.members,
        "billing.feature.has-email-notifications":
          formsFreePlanFeatures.hasEmailNotifications,
        "billing.feature.has-custom-urls": formsFreePlanFeatures.hasCustomUrls,
        "billing.feature.has-webhooks": formsFreePlanFeatures.hasWebhooks,
        "billing.feature.has-spam-protection":
          formsFreePlanFeatures.hasSpamProtection,
        "billing.feature.has-security":
          formsFreePlanFeatures.hasWebsites ||
          formsFreePlanFeatures.hasBlockIPs,
      },
    };

    return productFeatures[product]
      ? Object.entries(productFeatures[product]).map(([key, value]) =>
          // @ts-ignore
          t(key, { value: formatValue(value) }),
        )
      : [];
  }, [product, t]);

  const getPlansList = useCallback(() => {
    const formatValue = (value: number | boolean) =>
      typeof value === "boolean" ? (value ? "✔️" : "✖️") : formatNumber(value);

    const getPlanFeatures = (limits: any, features: any, featureKeys: any) =>
      featureKeys.map(
        ({
          intlKey,
          key,
          valueKey,
        }: {
          intlKey: string;
          key: string;
          valueKey: string;
        }) => {
          // @ts-ignore
          return t(intlKey, {
            value: formatValue(valueKey ? features[valueKey] : limits[key]),
          });
        },
      );

    const productPlans = {
      "feature-flags": {
        plans: config.plans.flags,
        featureKeys: [
          { intlKey: "billing.feature.projects", key: "projects" },
          { intlKey: "billing.feature.flags", key: "flags" },
          { intlKey: "billing.feature.environments", key: "environments" },
          { intlKey: "billing.feature.members", key: "members" },
          {
            intlKey: "billing.feature.has-security",
            valueKey: "hasBlockIPs",
          },
          {
            intlKey: "billing.feature.has-remote-config",
            valueKey: "hasRemoteConfig",
          },
          {
            intlKey: "billing.feature.has-history",
            valueKey: "hasHistory",
          },
        ],
      },
      forms: {
        plans: config.plans.forms,
        featureKeys: [
          { intlKey: "billing.feature.forms", key: "forms" },
          { intlKey: "billing.feature.submissions", key: "submissions" },
          { intlKey: "billing.feature.members", key: "members" },
          {
            intlKey: "billing.feature.has-email-notifications",
            valueKey: "hasEmailNotifications",
          },
          {
            intlKey: "billing.feature.has-custom-urls",
            valueKey: "hasCustomUrls",
          },
          {
            intlKey: "billing.feature.has-webhooks",
            valueKey: "hasWebhooks",
          },
          {
            intlKey: "billing.feature.has-spam-protection",
            valueKey: "hasSpamProtection",
          },
          {
            intlKey: "billing.feature.has-security",
            valueKey: "hasBlockIPs",
          },
        ],
      },
    };

    if (!productPlans[product]) return null;

    return productPlans[product].plans
      .filter(
        ({ id }) => id !== PlanTypeId.FREE && id !== PlanTypeId.ENTERPRISE,
      )
      .map(({ id, price, limits, features }) => {
        const value =
          interval === "monthly" ? price.monthly.amount : price.yearly.amount;
        const description = t(
          interval === "monthly"
            ? "billing.cycle.monthly"
            : "billing.cycle.yearly",
        );

        return (
          <ListItem key={id}>
            <PlanCard
              title={id}
              features={getPlanFeatures(
                limits,
                features,
                productPlans[product].featureKeys,
              )}
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
      });
  }, [interval, isLoading, onCreateCheckout, product, t]);

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

  if (!hasActivePlan) {
    return (
      <Container>
        <Text mb={theme.spacing.s4} size="large">
          {t("billing.plan.current.title")}
        </Text>
        <PlanCard
          title={t("billing.plan.free")}
          features={getFreeFeatures()}
          amount={{
            symbol: t("billing.price.symbol"),
            abbr: t("billing.price.abbr"),
            value: 0,
            cycle: t("billing.cycle-abbr.monthly"),
          }}
          isDisabled={isLoading}
        />
        <UpgradePlanHeader
          externalCompareUrl={`${config.urls.baseLandingUrl}/product/${product}#pricing`}
          onSelectCycle={(value) => setInterval(value)}
          mt={theme.spacing.s7}
        />
        <List>{getPlansList()}</List>
      </Container>
    );
  }

  return (
    <Container>
      <ActivePlan
        isActive={subStatus === "active"}
        isBilledMonthly={recurringInterval === "month"}
        renewsAt={dayjs(subRenewsAt).format("MMMM D, YYYY") ?? ""}
        onManage={onCreatePortal}
        currentPlan={currentPlan}
        isLoadingExternalUrl={isLoadingExternalUrl}
      />
    </Container>
  );
};

export default Plans;
