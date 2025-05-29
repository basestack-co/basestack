import React, { useCallback, useMemo, useState } from "react";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import dayjs from "dayjs";
// Components
import { Skeleton, Text } from "@basestack/design-system";
import PlanCard from "./PlanCard";
import ActivePlan, { CurrentPlan } from "./ActivePlan";
// Styles
import { useTheme } from "styled-components";
import { Container } from "./styles";

export interface UsagePlanProps {
  product: Product;
  isLoadingSubscription: boolean;
  onCreateCheckoutCallback: (
    planId: PlanTypeId,
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

const UsagePlan = ({
  product,
  onCreateCheckoutCallback,
  onCreatePortalCallback,
  isLoadingSubscription,
  currentPlan,
  recurringInterval,
  subStatus,
  subRenewsAt,
  hasActivePlan,
}: UsagePlanProps) => {
  const t = useTranslations();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExternalUrl, setIsLoadingExternalUrl] = useState(false);


  const features = useMemo(() => {
    const resourceConfigs = {
      [Product.FORMS]: [
        {
          key: "form_submission",
          title: t("home.usage.meters.resource.form_submission"),
        },
        {
          key: "email_notification",
          title: t("home.usage.meters.resource.email_notification"),
        },
        { 
          key: "spam_check", 
          title: t("home.usage.meters.resource.spam_check") 
        },
        {
          key: "webhook_trigger",
          title: t("home.usage.meters.resource.webhook_trigger"),
        },
      ],
      [Product.FLAGS]: [
        {
          key: "api_requests",
          title: t("home.usage.meters.resource.api_requests"),
        },
        {
          key: "email_notification",
          title: t("home.usage.meters.resource.email_notification"),
        },
      ],
    };

    const resources = resourceConfigs[product];
    const meters = config.plans.getPlanMeters(product, PlanTypeId.USAGE);

    return resources.map((resource) => {
      const meter = meters.find((m) => m.key === resource.key);
      const costUnit = meter?.costUnit ?? 0;
      const unit = t("home.usage.meters.unit");

      return `${resource.title}: $${costUnit}/${unit}`;
    });
  }, [product, t]);


  const onCreatePortal = useCallback(() => {
    setIsLoadingExternalUrl(true);

    onCreatePortalCallback(setIsLoadingExternalUrl);
  }, [onCreatePortalCallback]);

  const onCreateCheckout = useCallback(
    (planId: PlanTypeId) => {
      setIsLoading(true);

      onCreateCheckoutCallback(planId, setIsLoading);
    },
    [onCreateCheckoutCallback],
  );

  const plan = useMemo(
    () => config.plans.getPlan(product, PlanTypeId.USAGE),
    [product],
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

  if (!hasActivePlan) {
    return (
      <Container>
        <Text mb={theme.spacing.s4} size="large">
          {t("profile.billing.plan.select.title")}
        </Text>
        <PlanCard
          title={t("profile.billing.plan.usage.title")}
          features={features}
          amount={{
            symbol: t("profile.billing.price.symbol"),
            abbr: t("profile.billing.price.abbr"),
            value: plan.price.monthly.amount,
            cycle: `${t("profile.billing.cycle-abbr.monthly")} ${t("profile.billing.plan.usage.additional")}`,
          }}
          onClick={() => onCreateCheckout(PlanTypeId.USAGE)}
          isDisabled={isLoading}
        />
        
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

export default UsagePlan;
