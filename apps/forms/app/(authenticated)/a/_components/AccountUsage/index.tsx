import React, { useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// UI
import { UsageSection } from "@basestack/ui";
// Styles
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { AppMode } from "utils/helpers/general";
import { config, PlanTypeId, Product } from "@basestack/utils";
import dayjs from "dayjs";

const AccountUsage = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const [subscription, usage] = api.useQueries((t) => [
    t.subscription.current(undefined),
    t.subscription.usage(undefined),
  ]);

  const currentPlan = useMemo(
    () =>
      config.plans.getPlanByVariantId(
        Product.FORMS,
        subscription.data?.product?.variantId ?? 0,
        subscription.data?.product.variant === "Monthly",
        AppMode
      ),
    [subscription.data]
  );

  const isSubscriptionActive = useMemo(
    () => subscription.data?.status === "active",
    [subscription.data]
  );

  const limits = useMemo(() => {
    const planId =
      isSubscriptionActive && currentPlan?.id
        ? (currentPlan.id as PlanTypeId)
        : PlanTypeId.FREE;

    return config.plans.getPlanLimits(Product.FORMS, planId);
  }, [currentPlan, isSubscriptionActive]);

  const currentUsage = useMemo(() => {
    const resourceMap = [
      { key: "forms", title: t("usage.resource.forms") },
      { key: "submissions", title: t("usage.resource.submissions") },
      { key: "spams", title: t("usage.resource.spams") },
      { key: "members", title: t("usage.resource.members") },
    ];

    return resourceMap.map(({ key, title }) => ({
      title,
      used: Number(usage.data?.[key as keyof typeof usage.data] ?? 0),
      total: Number(limits[key as keyof typeof limits] ?? 0),
    }));
  }, [limits, usage, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={t("usage.title")}
      date={
        usage?.data?.billingCycleStart
          ? t("usage.date", {
              date: dayjs(usage.data?.billingCycleStart).format("MMMM D, YYYY"),
            })
          : ""
      }
      link={t("usage.link.upgrade")}
      href="/a/user/tab/billing"
      data={currentUsage}
      isLoading={subscription.isLoading || usage.isLoading}
    />
  );
};

export default AccountUsage;
