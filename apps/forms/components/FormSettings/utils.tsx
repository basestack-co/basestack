import React from "react";
// Utils
import { config, PlanTypeId, Plan } from "@basestack/utils";
// Types
import { Translate } from "next-translate";
import { useRouter } from "next/navigation";
// Design System
import { CardVariant } from "@basestack/design-system";

export interface WithPlanCardProps {
  planId: PlanTypeId;
  feature: keyof Plan["features"];
  t: Translate;
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
  const hasFeature = config.plans.hasFormPlanFeature(planId, feature);

  return !hasFeature
    ? {
        button: t("common:plan.forms.upgrade.action"),
        onClick: () => router.push("/user/profile/settings"),
        hasOverlay: true,
        variant: CardVariant.PRIMARY,
        label: t(`common:plan.forms.upgrade.${partial ? "partial" : "all"}`),
      }
    : {
        button: t(i18nKey),
        text: i18nHintKey ? t(i18nHintKey) : "",
        onClick,
        isLoading,
        isDisabled,
      };
};

export interface WithPlanSwitchProps {
  planId: PlanTypeId;
  feature: keyof Plan["features"];
  t: Translate;
  isDisabled: boolean;
  partial?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const getWithPlanSwitchProps = ({
  planId,
  feature,
  t,
  isDisabled,
  partial = true,
  onChange,
  checked,
}: WithPlanSwitchProps) => {
  const hasFeature = config.plans.hasFormPlanFeature(planId, feature);

  return !hasFeature
    ? {
        variant: CardVariant.PRIMARY,
        hasOverlay: true,
        label: t(`common:plan.forms.upgrade.${partial ? "partial" : "all"}`),
        onChange: () => null,
        checked: false,
      }
    : { hasOverlay: isDisabled, onChange, checked };
};
