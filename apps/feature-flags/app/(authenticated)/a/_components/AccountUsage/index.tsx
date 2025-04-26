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
        Product.FLAGS,
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

    return config.plans.getPlanLimits(Product.FLAGS, planId);
  }, [currentPlan, isSubscriptionActive]);

  const currentUsage = useMemo(() => {
    const resourceMap = [
      { key: "projects", title: t("usage.resource.projects") },
      { key: "flags", title: t("usage.resource.flags") },
      { key: "members", title: t("usage.resource.members") },
      {
        key: "apiRequests",
        title: t("usage.resource.api-requests"),
        description: "Reqs",
      },
    ];

    return resourceMap.map(({ key, title, description }) => ({
      title,
      used: Number(usage.data?.[key as keyof typeof usage.data] ?? 0),
      total: Number(limits[key as keyof typeof limits] ?? 0),
      ...(description ? { description } : {}),
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
