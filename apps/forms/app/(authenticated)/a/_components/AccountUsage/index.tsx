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
import { config, PlanTypeId, Product } from "@basestack/utils";
import dayjs from "dayjs";

const AccountUsage = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const { data, isLoading } = api.subscription.usage.useQuery();

  const limits = useMemo(() => {
    const planId = (data?.planId ?? PlanTypeId.FREE) as PlanTypeId;

    return config.plans.getPlanLimits(Product.FORMS, planId);
  }, [data]);

  const currentUsage = useMemo(() => {
    const resourceMap = [
      { key: "forms", title: t("usage.resource.forms") },
      { key: "submissions", title: t("usage.resource.submissions") },
      { key: "spams", title: t("usage.resource.spams") },
      { key: "members", title: t("usage.resource.members") },
    ];

    return resourceMap.map(({ key, title }) => ({
      title,
      used: Number(data?.[key as keyof typeof data] ?? 0),
      total: Number(limits[key as keyof typeof limits] ?? 0),
    }));
  }, [limits, data, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={t("usage.title")}
      date={
        data?.billingCycleStart
          ? t("usage.date", {
              date: dayjs(data?.billingCycleStart).format("MMMM D, YYYY"),
            })
          : ""
      }
      link={t("usage.link.upgrade")}
      href="/a/user/tab/billing"
      data={currentUsage}
      isLoading={isLoading}
    />
  );
};

export default AccountUsage;
