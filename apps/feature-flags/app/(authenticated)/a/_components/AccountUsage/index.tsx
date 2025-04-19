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
import { config, PlanTypeId } from "@basestack/utils";
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
      config.plans.getFlagsPlanByVariantId(
        subscription.data?.product?.variantId ?? 0,
        subscription.data?.product.variant === "Monthly",
        AppMode,
      ),
    [subscription.data],
  );

  const limits = useMemo(
    () => config.plans.getFlagsPlanLimits(currentPlan?.id as PlanTypeId),
    [currentPlan],
  );

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
        subscription.data?.renewsAt
          ? t("usage.date", {
              date: dayjs(subscription.data?.renewsAt).format("MMMM D, YYYY"),
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
