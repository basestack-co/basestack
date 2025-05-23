import React, { useMemo } from "react";
// Server
import { api } from "utils/trpc/react";
// UI
import { UsageSection } from "@basestack/ui";
// Styles
import { useTheme } from "styled-components";
// Libs
import { authClient } from "libs/auth/client";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
import dayjs from "dayjs";
// Tanstack
import { useQuery } from "@tanstack/react-query";

const AccountUsage = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const { data: usage, isLoading } = api.usage.current.useQuery();

  const { data, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ["polar-customer-state"],
    queryFn: async () => {
      const { data } = await authClient.customer.state();
      return data;
    },
  });

  const sub = useMemo(() => {
    if (!data) return null;

    const subscription = data.activeSubscriptions.find(
      ({ metadata }: { metadata: { product: string } }) =>
        metadata.product === Product.FLAGS,
    );

    if (!subscription) return null;

    return {
      planId: subscription?.metadata.planId ?? "",
      currentPeriodEnd: subscription?.currentPeriodEnd ?? "",
    };
  }, [data]);

  const limits = useMemo(() => {
    const planId = (sub?.planId ?? PlanTypeId.FREE) as PlanTypeId;

    return config.plans.getPlanLimits(Product.FLAGS, planId);
  }, [sub]);

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
      used: Number(usage?.[key as keyof typeof usage] ?? 0),
      total: Number(limits[key as keyof typeof limits] ?? 0),
      ...(description ? { description } : {}),
    }));
  }, [limits, usage, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={t("usage.title")}
      date={
        sub?.currentPeriodEnd
          ? t("usage.date", {
              date: dayjs(sub?.currentPeriodEnd).format("MMMM D, YYYY"),
            })
          : ""
      }
      link={
        sub?.planId === PlanTypeId.SCALE
          ? t("usage.link.manage")
          : t("usage.link.upgrade")
      }
      href="/a/user/tab/billing"
      data={currentUsage}
      isLoading={isLoading || isLoadingSubscription}
    />
  );
};

export default AccountUsage;
