import React from "react";
// Utils
import { config, PlanTypeId, FlagsPlan } from "@basestack/utils";
// Types
import { useRouter } from "next/navigation";
import { TFunction } from "types/locale";
// Design System
import { CardVariant } from "@basestack/design-system";

export interface WithPlanCardProps {
  planId: PlanTypeId;
  feature: keyof FlagsPlan["features"];
  t: TFunction;
  i18nKey: string;
  i18nHintKey?: string;
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  partial?: boolean;
  router: ReturnType<typeof useRouter>;
}

export const getWithPlanCardProps = ({
  planId,
  feature,
  t,
  i18nKey,
  i18nHintKey,
  onClick,
  isLoading,
  isDisabled,
  partial = true,
  router,
}: WithPlanCardProps) => {
  const hasFeature = config.plans.hasFlagsPlanFeature(planId, feature);

  return !hasFeature
    ? {
        button: t("common.plan.flags.upgrade.action"),
        onClick: () => router.push("/a/user/tab/billing"),
        hasOverlay: true,
        variant: CardVariant.PRIMARY,
        label: partial
          ? t("common.plan.flags.upgrade.partial")
          : t("common.plan.flags.upgrade.all"),
      }
    : {
        button: t(i18nKey as any),
        text: i18nHintKey ? t(i18nHintKey as any) : "",
        onClick,
        isLoading,
        isDisabled,
      };
};

export interface WithPlanSwitchProps {
  planId: PlanTypeId;
  feature: keyof FlagsPlan["features"];
  t: TFunction;
  isDisabled: boolean;
  partial?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
