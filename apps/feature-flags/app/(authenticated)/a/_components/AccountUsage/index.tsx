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

    return config.plans.getPlanLimits(Product.FLAGS, planId);
  }, [data]);

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
      used: Number(data?.[key as keyof typeof data] ?? 0),
      total: Number(limits[key as keyof typeof limits] ?? 0),
      ...(description ? { description } : {}),
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
      link={
        data?.planId === PlanTypeId.SCALE
          ? t("usage.link.manage")
          : t("usage.link.upgrade")
      }
      href="/a/user/tab/billing"
      data={currentUsage}
      isLoading={isLoading}
    />
  );
};

export default AccountUsage;
