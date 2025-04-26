import React, { useCallback, useState } from "react";
// Locales
import { useTranslations } from "next-intl";
// Utils
import {
  config,
  formatNumber,
  getBrowserUrl,
  PlanTypeId,
  Product,
  FlagsPlan,
  FormPlan,
} from "@basestack/utils";
import dayjs from "dayjs";
// Types
import { BillingInterval } from "./types";
// Components
import { Skeleton, Text } from "@basestack/design-system";
import PlanCard from "./PlanCard";
import UpgradePlanHeader from "./UpgradePlanHeader";
import ActivePlan, { CurrentPlan } from "./ActivePlan";
// Styles
import { useTheme } from "styled-components";
import { Container, List, ListItem } from "./styles";

const flagsFreePlanLimits = config.plans.getPlanLimits(
  Product.FLAGS,
  PlanTypeId.FREE
) as FlagsPlan["limits"];

const flagsFreePlanFeatures = config.plans.getPlanFeatures(
  Product.FLAGS,
  PlanTypeId.FREE
) as FlagsPlan["features"];

const formsFreePlanLimits = config.plans.getPlanLimits(
  Product.FORMS,
  PlanTypeId.FREE
) as FormPlan["limits"];

const formsFreePlanFeatures = config.plans.getPlanFeatures(
  Product.FORMS,
  PlanTypeId.FREE
) as FormPlan["features"];

export interface PlansProps {
  product: "forms" | "feature-flags";
  isLoadingSubscription: boolean;
  onCreateCheckoutCallback: (
    planId: PlanTypeId,
    interval: "monthly" | "yearly",
    redirectUrl: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    onHandleExternalUrl: (url?: string) => void
  ) => void;
  currentPlan?: CurrentPlan;
  productVariant: string;
  cardBrand: string;
  cardLastFour: string;
  subStatus: string;
  subRenewsAt: string;
  customerPortalUrl: string;
  updatePaymentMethodUrl: string;
  hasActivePlan: boolean;
}

const Plans = ({
  product,
  onCreateCheckoutCallback,
  isLoadingSubscription,
  currentPlan,
  productVariant,
  cardBrand,
  cardLastFour,
  subStatus,
  subRenewsAt,
  customerPortalUrl,
  updatePaymentMethodUrl,
  hasActivePlan,
}: PlansProps) => {
  const t = useTranslations("profile");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExternalUrl, setIsLoadingExternalUrl] = useState(false);
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  const onHandleExternalUrl = useCallback((url?: string) => {
    if (url) {
      setIsLoadingExternalUrl(true);
      window.location.href = `${url}`;
    }

    setTimeout(() => {
      setIsLoadingExternalUrl(false);
    }, 10000);
  }, []);

  const onCreateCheckout = useCallback(
    (planId: PlanTypeId) => {
      setIsLoading(true);

      onCreateCheckoutCallback(
        planId,
        interval,
        `${getBrowserUrl()}/a/user/tab/billing`,
        setIsLoading,
        onHandleExternalUrl
      );
    },
    [interval, onCreateCheckoutCallback, onHandleExternalUrl]
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
          t(key, { value: formatValue(value) })
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
        }
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
        ({ id }) => id !== PlanTypeId.FREE && id !== PlanTypeId.ENTERPRISE
      )
      .map(({ id, price, limits, features }) => {
        const value =
          interval === "monthly" ? price.monthly.amount : price.yearly.amount;
        const description = t(
          interval === "monthly"
            ? "billing.cycle.monthly"
            : "billing.cycle.yearly"
        );

        return (
          <ListItem key={id}>
            <PlanCard
              title={id}
              features={getPlanFeatures(
                limits,
                features,
                productPlans[product].featureKeys
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
        isBilledMonthly={productVariant === "Monthly"}
        renewsAt={dayjs(subRenewsAt).format("MMMM D, YYYY") ?? ""}
        cardBrand={cardBrand ?? ""}
        cardLastFour={cardLastFour ?? ""}
        onManage={() => onHandleExternalUrl(customerPortalUrl)}
        onUpdate={() => onHandleExternalUrl(updatePaymentMethodUrl)}
        currentPlan={currentPlan}
        isLoadingExternalUrl={isLoadingExternalUrl}
      />
    </Container>
  );
};

export default Plans;
