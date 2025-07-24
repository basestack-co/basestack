"use client";

import React, { Fragment, useMemo, useState } from "react";
import {
  config,
  config as defaults,
  formatNumber,
  PlanTypeId,
  Product,
} from "@basestack/utils";
// Icons
import { HtmlIcon, JavascriptIcon, NextJsIcon } from "components/Code/icons";
// Components
import { ButtonVariant } from "@basestack/design-system";
import {
  Hero,
  Banner,
  Cards,
  Questions,
  Slider,
  Pricing as _Pricing,
  ProductNavigation,
  MiniCards,
  Code,
  PricingUsage,
} from "components";
// Styles
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";

const { urls } = defaults;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ProductFormsPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();
  const [usage, setUsage] = useState<Record<string, number>>({});

  const minimumSpend = useMemo(() => {
    const plan = config.plans.getPlan(Product.FORMS, PlanTypeId.USAGE);
    return plan.price.monthly.amount;
  }, []);

  const estimatedCost = useMemo(() => {
    const cost = config.plans.getMetersEstimatedCost(
      Product.FORMS,
      PlanTypeId.USAGE,
      usage,
    );

    const valueToFormat = cost !== 0 ? cost : minimumSpend;

    return currencyFormatter.format(valueToFormat);
  }, [usage, minimumSpend]);

  const getPricingSliders = useMemo(() => {
    const meters = config.plans.getPlanMeters(Product.FORMS, PlanTypeId.USAGE);

    const values: Record<
      string,
      { min: string; max: string; initialValue: number }
    > = {
      form_submission: {
        min: "500",
        max: "100000",
        initialValue: 500,
      },
      email_notification: {
        min: "0",
        max: "100000",
        initialValue: 0,
      },
      spam_check: {
        min: "0",
        max: "100000",
        initialValue: 0,
      },
      webhook_trigger: {
        min: "0",
        max: "100000",
        initialValue: 0,
      },
      integration_call: {
        min: "0",
        max: "100000",
        initialValue: 0,
      },
    };

    return meters
      .filter((meter) => meter.key !== "integration_call")
      .map((meter) => ({
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
        product="forms"
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
            href: urls.docs.forms.base,
            icon: "docs",
            isExternal: true,
          },
        ]}
        button={{
          text: t("navigation.auth.sign-in.google"),
          href: `${urls.app.production.forms}/auth/sign-in?provider=google`,
        }}
      />
      <Hero
        header={{
          titleTag: "h1",
          title: t("page.product.forms.hero.title"),
          text: t("page.product.forms.hero.description"),
          titleSize: "xLarge",
        }}
        actions={[
          {
            id: "1",
            text: t("navigation.auth.sign-in.google"),
            href: `${urls.app.production.forms}/auth/sign-in?provider=google`,
            isExternal: true,
            icon: "google",
            variant: ButtonVariant.Primary,
          },
          {
            id: "2",
            text: t("navigation.auth.sign-in.github"),
            href: `${urls.app.production.forms}/auth/sign-in?provider=github`,
            isExternal: true,
            icon: "github",
            variant: ButtonVariant.Secondary,
          },
        ]}
        image={{
          src: `/images/product/forms/submissions${isDarkMode ? "_dark" : ""}.png`,
          alt: "product demo",
        }}
      />
      <Cards
        id="why"
        caption={t("page.product.forms.why.caption")}
        title={t("page.product.forms.why.title")}
        text={t("page.product.forms.why.description")}
        cards={[
          {
            title: t("page.product.forms.why.card.html.title"),
            text: t("page.product.forms.why.card.html.description"),
            icon: "html",
          },
          {
            title: t("page.product.forms.why.card.javascript.title"),
            text: t("page.product.forms.why.card.javascript.description"),
            icon: "javascript",
          },
          {
            title: t("page.product.forms.why.card.api.title"),
            text: t("page.product.forms.why.card.api.description"),
            icon: "api",
          },
        ]}
      />
      <Slider
        id="features"
        caption={t("page.product.forms.features.caption")}
        title={t("page.product.forms.features.title")}
        text={t("page.product.forms.features.description")}
        data={[
          {
            icon: "dashboard",
            title: t("page.product.forms.features.slide.one.title"),
            text: t("page.product.forms.features.slide.one.description"),
            image: {
              src: `/images/product/forms/all_forms${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.forms.features.slide.one.alt"),
            },
          },
          {
            icon: "code",
            title: t("page.product.forms.features.slide.two.title"),
            text: t("page.product.forms.features.slide.two.description"),
            image: {
              src: `/images/product/forms/setup${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.forms.features.slide.two.alt"),
            },
          },
          {
            icon: "lock",
            title: t("page.product.forms.features.slide.three.title"),
            text: t("page.product.forms.features.slide.three.description"),
            image: {
              src: `/images/product/forms/security${isDarkMode ? "_dark" : ""}.png`,
              alt: t("page.product.forms.features.slide.three.alt"),
            },
          },
        ]}
      />
      <MiniCards
        id="mini-cards"
        caption={t("page.product.forms.more-features.caption")}
        title={t("page.product.forms.more-features.title")}
        text={t("page.product.forms.more-features.description")}
        cards={[
          {
            title: t("page.product.forms.more-features.card.inbox.title"),
            description: t(
              "page.product.forms.more-features.card.inbox.description",
            ),
            icon: "inbox",
          },
          {
            title: t("page.product.forms.more-features.card.sharing.title"),
            description: t(
              "page.product.forms.more-features.card.sharing.description",
            ),
            icon: "groups",
          },
          {
            title: t("page.product.forms.more-features.card.export.title"),
            description: t(
              "page.product.forms.more-features.card.export.description",
            ),
            icon: "download",
          },
          {
            title: t("page.product.forms.more-features.card.spam.title"),
            description: t(
              "page.product.forms.more-features.card.spam.description",
            ),
            icon: "block",
          },
          {
            title: t("page.product.forms.more-features.card.redirects.title"),
            description: t(
              "page.product.forms.more-features.card.redirects.description",
            ),
            icon: "link",
          },
          {
            title: t("page.product.forms.more-features.card.uploads.title"),
            description: t(
              "page.product.forms.more-features.card.uploads.description",
            ),
            icon: "upload_file",
          },
          {
            title: t("page.product.forms.more-features.card.responses.title"),
            description: t(
              "page.product.forms.more-features.card.responses.description",
            ),
            icon: "send",
          },
          {
            title: t("page.product.forms.more-features.card.templates.title"),
            description: t(
              "page.product.forms.more-features.card.templates.description",
            ),
            icon: "contract",
          },
          {
            title: t("page.product.forms.more-features.card.analytics.title"),
            description: t(
              "page.product.forms.more-features.card.analytics.description",
            ),
            icon: "bar_chart",
          },
          {
            title: t("page.product.forms.more-features.card.builder.title"),
            description: t(
              "page.product.forms.more-features.card.builder.description",
            ),
            icon: "build",
          },
        ]}
      />
      <Code
        id="guides"
        caption={t("page.product.forms.guide.caption")}
        title={t("page.product.forms.guide.title")}
        description={t("page.product.forms.guide.description")}
        data={[
          {
            icon: <HtmlIcon />,
            title: t("page.product.forms.guide.html.title"),
            description: t("page.product.forms.guide.html.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/content/forms/guides/html`,
                "_blank",
              ),
          },
          {
            icon: <JavascriptIcon />,
            title: t("page.product.forms.guide.js.title"),
            description: t("page.product.forms.guide.js.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/content/forms/guides/javascript`,
                "_blank",
              ),
          },
          {
            icon: <NextJsIcon />,
            title: t("page.product.forms.guide.next.title"),
            description: t("page.product.forms.guide.next.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/content/forms/guides/react`,
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
            t("page.product.forms.pricing.feature.forms", {
              value: formatNumber(Infinity),
            }),
            t("page.product.forms.pricing.feature.submissions", {
              value: formatNumber(Infinity),
            }),
            t("page.product.forms.pricing.feature.spams", {
              value: formatNumber(Infinity),
            }),
            t("page.product.forms.pricing.feature.members", {
              value: formatNumber(Infinity),
            }),
            t("page.product.forms.pricing.feature.has-email-notifications"),
            t("page.product.forms.pricing.feature.has-webhooks"),
            t("page.product.forms.pricing.feature.has-custom-export"),
            t("page.product.forms.pricing.feature.has-custom-urls"),
            t("page.product.forms.pricing.feature.has-security"),
          ],
          button: {
            onClick: () => {
              window.open(urls.app.production.forms, "_self");
            },
            text: t("navigation.product.get-started.title"),
          },
          footer: t("common.pricing.usage.footer"),
        }}
      />

      <Questions
        id="questions"
        title={t("common.questions.title")}
        text={t("common.questions.description", { product: "Basestack Forms" })}
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
              product: "Basestack Forms",
            }),
            text: t("common.questions.3.description", {
              product: "Basestack Forms",
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
      <Banner
        id="banner"
        title={t("page.product.forms.banner.title")}
        text={t("page.product.forms.banner.description")}
        buttons={[
          {
            text: t("page.product.forms.banner.action.get-free"),
            onClick: () => {
              window.open(urls.app.production.forms, "_blank");
            },
          },
          {
            text: t("page.product.forms.banner.action.star-github"),
            onClick: () => {
              window.open(urls.repo, "_blank");
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default ProductFormsPage;
