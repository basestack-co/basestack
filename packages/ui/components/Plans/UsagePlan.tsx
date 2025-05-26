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
  const t = useTranslations("profile");
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingExternalUrl, setIsLoadingExternalUrl] = useState(false);

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
          {t("billing.plan.select.title")}
        </Text>
        <PlanCard
          title={t("billing.plan.usage.title")}
          features={(t("billing.feature.summary") ?? "").split("| ")}
          amount={{
            symbol: t("billing.price.symbol"),
            abbr: t("billing.price.abbr"),
            value: plan.price.monthly.amount,
            cycle: `${t("billing.cycle-abbr.monthly")} ${t("billing.plan.usage.additional")}`,
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
