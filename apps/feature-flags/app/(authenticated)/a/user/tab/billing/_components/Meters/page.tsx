"use client";

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
import { Product, PlanTypeId, config } from "@basestack/utils";

interface MetersProps {
  isLoadingSubscription: boolean;
}

const Meters = ({ isLoadingSubscription }: MetersProps) => {
  const t = useTranslations("home");
  const theme = useTheme();

  const { isLoading, data } = api.subscription.meters.useQuery(undefined, {
    enabled: !isLoadingSubscription,
  });

  const minimumSpend = useMemo(() => {
    const plan = config.plans.getPlan(Product.FLAGS, PlanTypeId.USAGE);
    return plan.price.monthly.amount;
  }, []);

  const planMeters = useMemo(() => {
    return config.plans.getPlanMeters(Product.FLAGS, PlanTypeId.USAGE);
  }, []);

  const estimatedCost = useMemo(() => {
    const usage = data?.meters?.reduce(
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
  }, [data, minimumSpend]);

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
    const resourceMap = [
      {
        key: "api_requests",
        title: t("usage.meters.resource.api_requests"),
      },
      {
        key: "email_notification",
        title: t("usage.meters.resource.email_notification"),
      },
    ];

    return resourceMap
      .map((resource) => {
        const meter = data?.meters?.find((m) => m.nameKey === resource.key);
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
          description: isCredited
            ? `${t("usage.meters.credited")} ${description}`
            : description,
        };
      })
      .filter(
        (meter): meter is NonNullable<typeof meter> => meter !== undefined,
      );
  }, [data?.meters, planMeters, t]);

  return (
    <UsageSection
      mb={theme.spacing.s7}
      title={t("usage.meters.title", { cost: formattedEstimatedCost })}
      date={t("usage.meters.description", {
        minimumSpend: formattedMinimumSpend,
      })}
      data={currentMeters}
      isLoading={isLoading || isLoadingSubscription}
    />
  );
};

export default Meters;
