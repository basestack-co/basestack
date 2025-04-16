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
      config.plans.getFormPlanByVariantId(
        subscription.data?.product?.variantId ?? 0,
        subscription.data?.product.variant === "Monthly",
        AppMode,
      ),
    [subscription.data],
  );

  const limits = useMemo(
    () => config.plans.getFormPlanLimits(currentPlan?.id as PlanTypeId),
    [currentPlan],
  );

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
        subscription.data?.renewsAt
          ? t("usage.date", {
              date: dayjs(subscription.data?.renewsAt).format("MMMM D, YYYY"),
            })
          : ""
      }
      link={t("usage.link.upgrade")}
      href="/a/user/tab/billing"
      data={currentUsage}
    />
  );
};

export default AccountUsage;
