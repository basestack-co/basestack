// Utils
import { config, PlanTypeId, FlagsPlan, Product } from "@basestack/utils";
// Types
import { useRouter } from "next/navigation";
// Design System
import { CardVariant } from "@basestack/design-system";

export interface WithPlanCardProps {
  planId: PlanTypeId;
  feature: keyof FlagsPlan["features"];
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
    Product.FLAGS,
    planId,
    feature,
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
