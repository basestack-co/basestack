"use client";

// UI
import { UsageSection } from "@basestack/ui";
// Utils
import { config, PlanTypeId, Product } from "@basestack/utils";
// Locales
import { useTranslations } from "next-intl";
import { useMemo } from "react";
// Styles
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";

interface MetersProps {
  isLoadingSubscription: boolean;
  title?: string;
  date?: string;
  link?: string;
  href?: string;
  numberOfMeters?: number;
}

const Meters = ({
  isLoadingSubscription,
  title,
  date,
  link,
  href,
  numberOfMeters = 100,
}: MetersProps) => {
  const t = useTranslations("home");
  const theme = useTheme();

  const [meters, usage] = api.useQueries((t) => [
    t.subscription.meters(undefined, {
      enabled: !isLoadingSubscription,
      refetchOnMount: "always",
    }),
    t.subscription.usage(undefined, {
      enabled: !isLoadingSubscription,
      refetchOnMount: "always",
    }),
  ]);

  const minimumSpend = useMemo(() => {
    const plan = config.plans.getPlan(Product.FLAGS, PlanTypeId.USAGE);
    return plan.price.monthly.amount;
  }, []);

  const planMeters = useMemo(() => {
    return config.plans.getPlanMeters(Product.FLAGS, PlanTypeId.USAGE);
  }, []);

  const estimatedCost = useMemo(() => {
    const usage = meters.data?.meters?.reduce(
      (acc, meter) => {
        if (!meter.creditedUnits) {
          acc[meter.nameKey] = meter.consumedUnits;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return (
      Math.ceil(
        (config.plans.getMetersEstimatedCost(
          Product.FLAGS,
          PlanTypeId.USAGE,
          usage || {},
        ) +
          minimumSpend) *
          100,
      ) / 100
    );
  }, [meters.data, minimumSpend]);

  const formattedEstimatedCost = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(estimatedCost),
    [estimatedCost],
  );

  const formattedMinimumSpend = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(minimumSpend),
    [minimumSpend],
  );

  const currentMeters = useMemo(() => {
    const resources = [
      {
        key: "api_requests",
        title: t("usage.meters.resource.api_requests"),
      },
      {
        key: "email_notification",
        title: t("usage.meters.resource.email_notification"),
      },
    ];

    return resources
      .map((resource) => {
        const meter = meters.data?.meters?.find(
          (m) => m.nameKey === resource.key,
        );
        const planMeter = planMeters.find((m) => m.key === resource.key);

        if (!meter) return undefined;

        const costPerUnit = planMeter?.costUnit ?? 0;
        const description = `$${costPerUnit}/${t("usage.meters.unit")}`;
        const isCredited = meter.creditedUnits !== 0;
        const totalUnits = isCredited ? (meter.creditedUnits ?? 0) : Infinity;

        return {
          title: resource.title,
          used: meter.consumedUnits ?? 0,
          total: totalUnits,
          description: meter?.consumedUnits === 0 ? description : "",
        };
      })
      .filter(
        (meter): meter is NonNullable<typeof meter> => meter !== undefined,
      );
  }, [meters.data?.meters, planMeters, t]);

  const currentUsage = useMemo(() => {
    const resources = [
      { key: "projects", title: t("usage.resource.projects") },
      { key: "flags", title: t("usage.resource.flags") },
      { key: "teams", title: t("usage.resource.teams") },
      { key: "members", title: t("usage.resource.members") },
    ];

    return resources.map(({ key, title }) => ({
      title,
      used: Number(usage.data?.[key as keyof typeof usage.data] ?? 0),
      total: Infinity,
    }));
  }, [usage, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={title ?? t("usage.meters.title", { cost: formattedEstimatedCost })}
      date={
        date ??
        t("usage.meters.description", {
          minimumSpend: formattedMinimumSpend,
        })
      }
      data={[...currentMeters, ...currentUsage].slice(0, numberOfMeters)}
      isLoading={meters.isLoading || usage.isLoading || isLoadingSubscription}
      link={link}
      href={href}
    />
  );
};

export default Meters;
