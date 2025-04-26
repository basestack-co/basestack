import React from "react";
// Utils
import { config, PlanTypeId, FormPlan, Product } from "@basestack/utils";
// Types
import { useRouter } from "next/navigation";
// Design System
import { CardVariant } from "@basestack/design-system";

export interface WithPlanCardProps {
  planId: PlanTypeId;
  feature: keyof FormPlan["features"];
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
  partial?: boolean;
  router: ReturnType<typeof useRouter>;
  labels: {
    partial: string;
    all: string;
    upgrade: string;
    save: string;
    text: string;
  };
}

export const getWithPlanCardProps = ({
  planId,
  feature,
  onClick,
  isLoading,
  isDisabled,
  partial = true,
  router,
  labels,
}: WithPlanCardProps) => {
  const hasFeature = config.plans.hasPlanFeature(
    Product.FORMS,
    planId,
    feature
  );

  return !hasFeature
    ? {
        button: labels.upgrade,
        onClick: () => router.push("/a/user/tab/billing"),
        hasOverlay: true,
        variant: CardVariant.PRIMARY,
        label: partial ? labels.partial : labels.all,
      }
    : {
        button: labels.save,
        text: labels.text,
        onClick,
        isLoading,
        isDisabled,
      };
};

export interface WithPlanSwitchProps {
  planId: PlanTypeId;
  feature: keyof FormPlan["features"];
  isDisabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  label: string;
}

export const getWithPlanSwitchProps = ({
  planId,
  feature,
  isDisabled,
  onChange,
  checked,
  label,
}: WithPlanSwitchProps) => {
  const hasFeature = config.plans.hasPlanFeature(
    Product.FORMS,
    planId,
    feature
  );

  return !hasFeature
    ? {
        variant: CardVariant.PRIMARY,
        hasOverlay: true,
        label,
        onChange: () => null,
        checked: false,
      }
    : { hasOverlay: isDisabled, onChange, checked };
};
