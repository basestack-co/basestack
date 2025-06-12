"use client";

import React, { Fragment, useCallback, useMemo, useState } from "react";
import {
  config,
  config as defaults,
  formatNumber,
  PlanTypeId,
  Product,
} from "@basestack/utils";
// Components
import { ButtonVariant } from "@basestack/design-system";
import {
  Hero,
  Banner,
  Cards,
  Questions,
  Slider,
  Code,
  Pricing,
  ProductNavigation,
  MiniCards,
  BentoCards,
  PricingUsage,
} from "components";
// Icons
import { JavascriptIcon, JsonIcon, ReactIcon } from "components/Code/icons";
// Styles
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";

const { urls } = defaults;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
});

const ProductFeatureFlagsPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();
  const [usage, setUsage] = useState<Record<string, number>>({});

  const minimumSpend = useMemo(() => {
    const plan = config.plans.getPlan(Product.FLAGS, PlanTypeId.USAGE);
    return plan.price.monthly.amount;
  }, []);

  const estimatedCost = useMemo(() => {
    const cost = config.plans.getMetersEstimatedCost(
      Product.FLAGS,
      PlanTypeId.USAGE,
      usage,
    );

    const valueToFormat = cost !== 0 ? cost : minimumSpend;

    return currencyFormatter.format(valueToFormat);
  }, [usage, minimumSpend]);

  const getPricingSliders = useMemo(() => {
    const meters = config.plans.getPlanMeters(Product.FLAGS, PlanTypeId.USAGE);

    const values: Record<
      string,
      { min: string; max: string; initialValue: number }
    > = {
      api_requests: {
        min: "500000",
        max: "1000000000",
        initialValue: 500000,
      },
      email_notification: {
        min: "0",
        max: "100000",
        initialValue: 0,
      },
    };

    return meters.map((meter) => ({
      id: meter.key,
      title: t(`common.pricing.usage.count.${meter.key}` as any),
      description: t(`common.pricing.usage.count.${meter.key}` as any),
      costUnit: t("common.pricing.usage.unit", {
        value: meter.costUnit,
      }),
      onChange: (id: string, value: number) => {
        setUsage((prev) => ({ ...prev, [id]: value }));
      },
      ...values[meter.key],
    }));
  }, [t, setUsage]);

  return (
    <Fragment>
      <ProductNavigation
        product="flags"
        items={[
          {
            text: t("navigation.product.features.title"),
            href: "#platform",
            icon: "flare",
          },
          {
            text: t("navigation.product.pricing.title"),
            href: "#pricing",
            icon: "credit_card",
          },
          /*  {
            text: t("navigation.product.self-hosting.title"),
            href: "#sdks",
            icon: "host",
          },
          {
            text: t("navigation.product.roadmap.title"),
            href: "#features",
            icon: "road",
          }, */
          {
            text: t("navigation.product.docs.title"),
            href: urls.docs.flags.base,
            icon: "docs",
            isExternal: true,
          },
        ]}
        button={{
          text: t("navigation.auth.sign-in.google"),
          href: `${urls.app.production.flags}/auth/sign-in?provider=google`,
        }}
      />
      <Hero
        header={{
          titleTag: "h1",
          title: t("page.product.flags.hero.title"),
          text: t("page.product.flags.hero.description"),
          titleSize: "xLarge",
          titleMaxWidth: 22,
        }}
        actions={[
          {
            id: "1",
            text: t("navigation.auth.sign-in.google"),
            href: `${urls.app.production.flags}/auth/sign-in?provider=google`,
            isExternal: true,
            icon: "google",
            variant: ButtonVariant.Primary,
          },
          {
            id: "2",
            text: t("navigation.auth.sign-in.github"),
            href: `${urls.app.production.flags}/auth/sign-in?provider=github`,
            isExternal: true,
            icon: "github",
            variant: ButtonVariant.Secondary,
          },
        ]}
        image={{
          src: `/images/product/flags/flags_cards_popups${isDarkMode ? "_dark" : ""}.png`,
          alt: "product demo",
        }}
      />
      <Slider
        id="features"
        caption={t("page.product.flags.features.caption")}
        title={t("page.product.flags.features.title")}
        text={t("page.product.flags.features.description")}
        data={[
          {
            icon: "flag",
            title: t("page.product.flags.features.slide.one.title"),
            text: t("page.product.flags.features.slide.one.description"),
            image: {
              src: `/images/product/flags/multiple_projects${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.flags.features.slide.one.alt"),
            },
          },
          {
            icon: "history",
            title: t("page.product.flags.features.slide.two.title"),
            text: t("page.product.flags.features.slide.two.description"),
            image: {
              src: `/images/product/flags/activity${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.flags.features.slide.two.alt"),
            },
          },
          {
            icon: "send",
            title: t("page.product.flags.features.slide.three.title"),
            text: t("page.product.flags.features.slide.three.description"),
            image: {
              src: `/images/product/flags/remote_config${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.flags.features.slide.three.alt"),
            },
          },
        ]}
      />
      <BentoCards
        id="feature-cards"
        caption={t("page.product.flags.features.card.caption")}
        title={t("page.product.flags.features.card.title")}
        text={t("page.product.flags.features.card.description")}
        cards={[
          {
            title: t("page.product.flags.features.card.feature.projects.title"),
            text: t(
              "page.product.flags.features.card.feature.projects.description",
            ),
            component: "flagsCardSliderAnimation",
          },
          {
            title: t(
              "page.product.flags.features.card.feature.environments.title",
            ),
            text: t(
              "page.product.flags.features.card.feature.environments.description",
            ),
            component: "environmentToggleAnimation",
          },
          {
            title: t("page.product.flags.features.card.feature.history.title"),
            text: t(
              "page.product.flags.features.card.feature.history.description",
            ),
            component: "activityCardsAnimation",
          },
          {
            title: t(
              "page.product.flags.features.card.feature.remote-config.title",
            ),
            text: t(
              "page.product.flags.features.card.feature.remote-config.description",
            ),
            component: "codeAnimation",
          },
          {
            title: t("page.product.flags.features.card.feature.security.title"),
            text: t(
              "page.product.flags.features.card.feature.security.description",
            ),
            component: "accessLabelsAnimation",
          },
        ]}
      />
      <MiniCards
        id="mini-cards"
        caption={t("page.product.flags.more-features.caption")}
        title={t("page.product.flags.more-features.title")}
        text={t("page.product.flags.more-features.description")}
        cards={[
          {
            title: t("page.product.flags.more-features.card.history.title"),
            description: t(
              "page.product.flags.more-features.card.history.description",
            ),
            icon: "history",
          },
          {
            title: t("page.product.flags.more-features.card.rollbacks.title"),
            description: t(
              "page.product.flags.more-features.card.rollbacks.description",
            ),
            icon: "toggle_off",
          },
          {
            title: t("page.product.flags.more-features.card.sharing.title"),
            description: t(
              "page.product.flags.more-features.card.sharing.description",
            ),
            icon: "groups",
          },
          {
            title: t(
              "page.product.flags.more-features.card.bootstrapping.title",
            ),
            description: t(
              "page.product.flags.more-features.card.bootstrapping.description",
            ),
            icon: "toggle_on",
          },
          {
            title: t("page.product.flags.more-features.card.sdks.title"),
            description: t(
              "page.product.flags.more-features.card.sdks.description",
            ),
            icon: "code",
          },
          {
            title: t("page.product.flags.more-features.card.environment.title"),
            description: t(
              "page.product.flags.more-features.card.environment.description",
            ),
            icon: "nature",
          },
          {
            title: t("page.product.flags.more-features.card.security.title"),
            description: t(
              "page.product.flags.more-features.card.security.description",
            ),
            icon: "lock",
          },
        ]}
      />
      <Code
        id="code"
        caption={t("page.product.flags.sdks.caption")}
        title={t("page.product.flags.sdks.title")}
        description={t("page.product.flags.sdks.description")}
        data={[
          {
            icon: <ReactIcon />,
            title: t("page.product.flags.sdks.react.title"),
            description: t("page.product.flags.sdks.react.description"),
            button: t("page.product.flags.sdks.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/feature-flags/sdks/react`,
                "_blank",
              ),
          },
          {
            icon: <JavascriptIcon />,
            title: t("page.product.flags.sdks.js.title"),
            description: t("page.product.flags.sdks.js.description"),
            button: t("page.product.flags.sdks.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/feature-flags/sdks/javascript`,
                "_blank",
              ),
          },
          {
            icon: <JsonIcon />,
            title: t("page.product.flags.sdks.api.title"),
            description: t("page.product.flags.sdks.api.description"),
            button: t("page.product.flags.sdks.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/feature-flags/sdks/rest-api`,
                "_blank",
              ),
          },
        ]}
      />
      <PricingUsage
        id="pricing"
        caption={t("common.pricing.caption")}
        title={t("common.pricing.title")}
        text={t("common.pricing.description", {
          product: "Basestack Feature Flags",
        })}
        sliders={getPricingSliders}
        card={{
          title: t("common.pricing.usage.title"),
          label: t("common.pricing.usage.label"),
          amount: estimatedCost,
          items: [
            t("page.product.flags.pricing.feature.projects", {
              value: formatNumber(Infinity),
            }),
            t("page.product.flags.pricing.feature.environments", {
              value: formatNumber(Infinity),
            }),
            t("page.product.flags.pricing.feature.flags", {
              value: formatNumber(Infinity),
            }),
            t("page.product.flags.pricing.feature.api-requests", {
              value: formatNumber(Infinity),
            }),
            t("page.product.flags.pricing.feature.members", {
              value: formatNumber(Infinity),
            }),
            t("page.product.flags.pricing.feature.has-security"),
            t("page.product.flags.pricing.feature.has-history"),
            t("page.product.flags.pricing.feature.has-remote-config"),
          ],
          button: {
            onClick: () => {
              window.open(urls.app.production.flags, "_self");
            },
            text: t("navigation.product.get-started.title"),
          },
          footer: t("common.pricing.usage.footer"),
        }}
      />
      <Questions
        id="questions"
        title={t("common.questions.title")}
        text={t("common.questions.description", {
          product: "Basestack Feature Flags",
        })}
        data={[
          {
            title: t("common.questions.1.title"),
            text: t("common.questions.1.description"),
          },
          {
            title: t("common.questions.4.title"),
            text: t("common.questions.4.description"),
          },
          {
            title: t("common.questions.2.title"),
            text: t("common.questions.2.description"),
          },
          {
            title: t("common.questions.3.title", {
              product: "Basestack Feature Flags",
            }),
            text: t("common.questions.3.description", {
              product: "Basestack Feature Flags",
            }),
          },
          {
            title: t("common.questions.5.title"),
            text: t("common.questions.5.description"),
          },
          {
            title: t("common.questions.6.title"),
            text: t("common.questions.6.description"),
          },
          {
            title: t("common.questions.16.title"),
            text: t("common.questions.16.description"),
          },
        ]}
      />
      <Cards
        id="why"
        caption={t("page.product.flags.why.caption")}
        title={t("page.product.flags.why.title")}
        text={t("page.product.flags.why.description")}
        cards={[
          {
            title: t("page.product.flags.why.card.benefits.title"),
            text: t("page.product.flags.why.card.benefits.description"),
            icon: "deployed_code_update",
          },
          {
            title: t("page.product.flags.why.card.implementation.title"),
            text: t("page.product.flags.why.card.implementation.description"),
            icon: "toggle_on",
          },
          {
            title: t("page.product.flags.why.card.branching.title"),
            text: t("page.product.flags.why.card.branching.description"),
            icon: "terminal",
          },
        ]}
      />
      <Banner
        id="banner"
        title={t("page.product.flags.banner.title")}
        text={t("page.product.flags.banner.description")}
        buttons={[
          {
            text: t("page.product.flags.banner.action.get-free"),
            onClick: () => {
              window.open(urls.app.production.flags, "_blank");
            },
          },
          {
            text: t("page.product.flags.banner.action.star-github"),
            onClick: () => {
              window.open(urls.repo, "_blank");
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default ProductFeatureFlagsPage;
