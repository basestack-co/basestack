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
import dayjs from "dayjs";

const AccountUsage = () => {
  const t = useTranslations("home");
  const theme = useTheme();

  const [sub, usage] = api.useQueries((t) => [
    t.subscription.current(),
    t.subscription.usage(),
  ]);

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
      total: Infinity,
      ...(description ? { description } : {}),
    }));
  }, [usage, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={t("usage.title")}
      date={
        sub?.data?.currentPeriodEnd
          ? t("usage.date", {
              date: dayjs(sub?.data?.currentPeriodEnd).format("MMMM D, YYYY"),
            })
          : ""
      }
      link={
        sub.data?.status === "active"
          ? t("usage.link.manage")
          : t("usage.link.upgrade")
      }
      href="/a/user/tab/billing"
      data={currentUsage}
      isLoading={sub.isLoading || usage.isLoading}
    />
  );
};

export default AccountUsage;
