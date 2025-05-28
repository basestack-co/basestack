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
    const plan = config.plans.getPlan(Product.FORMS, PlanTypeId.USAGE);
    return plan.price.monthly.amount;
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
          Product.FORMS,
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
        key: "form_submission",
        title: t("usage.meters.resource.form_submission"),
      },
      {
        key: "email_notification",
        title: t("usage.meters.resource.email_notification"),
      },
      { key: "spam_check", title: t("usage.meters.resource.spam_check") },
      {
        key: "webhook_trigger",
        title: t("usage.meters.resource.webhook_trigger"),
      },
    ];

    return resourceMap
      .map((resource) => {
        const meter = data?.meters?.find((m) => m.nameKey === resource.key);

        if (!meter) {
          return undefined;
        }

        return {
          title: resource.title,
          used: meter?.consumedUnits ?? 0,
          total:
            meter?.creditedUnits === 0 ? Infinity : (meter?.creditedUnits ?? 0),
          description:
            meter?.creditedUnits === 0
              ? t("usage.meters.unlimited")
              : t("usage.meters.credited"),
        };
      })
      .filter((m) => m !== undefined);
  }, [data, t]);

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
