"use client";

import React, { Fragment } from "react";
import { config as defaults, events, formatNumber } from "@basestack/utils";
// Components
import {
  Hero,
  Banner,
  Cards,
  Questions,
  Slider,
  Pricing,
  ProductNavigation,
  MiniCards,
  Code,
} from "components";
// Styles
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";

const { plans, urls } = defaults;

const ProductFormsPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();

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
          text: t("navigation.product.get-started.title"),
          href: urls.app.production.forms,
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
            text: t("page.product.forms.hero.action.get-free"),
            href: urls.app.production.forms,
          },
          {
            id: "2",
            text: t("page.product.forms.hero.action.request-demo"),
            href: urls.app.production.forms,
            isTertiary: true,
          },
        ]}
        image={{
          src: `/images/product/forms/submissions${isDarkMode ? "_dark" : ""}.png`,
          alt: "product demo",
        }}
      />
      <Cards
        id="why"
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
            title: t("page.product.forms.more-features.card.redirects.title"),
            description: t(
              "page.product.forms.more-features.card.redirects.description",
            ),
            icon: "link",
          },
          {
            title: t("page.product.forms.more-features.card.sharing.title"),
            description: t(
              "page.product.forms.more-features.card.sharing.description",
            ),
            icon: "share",
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
            title: t("page.product.forms.more-features.card.export.title"),
            description: t(
              "page.product.forms.more-features.card.export.description",
            ),
            icon: "download",
          },
          {
            title: t("page.product.forms.more-features.card.builder.title"),
            description: t(
              "page.product.forms.more-features.card.builder.description",
            ),
            icon: "build",
          },
          {
            title: t("page.product.forms.more-features.card.spam.title"),
            description: t(
              "page.product.forms.more-features.card.spam.description",
            ),
            icon: "history",
          },
        ]}
      />
      <Code
        id="guides"
        title={t("page.product.forms.guide.title")}
        description={t("page.product.forms.guide.description")}
        data={[
          {
            title: t("page.product.forms.guide.html.title"),
            description: t("page.product.forms.guide.html.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(`${urls.docs.base}/forms/guides/html`, "_blank"),
          },
          {
            title: t("page.product.forms.guide.js.title"),
            description: t("page.product.forms.guide.js.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(
                `${urls.docs.base}/forms/guides/javascript`,
                "_blank",
              ),
          },
          {
            title: t("page.product.forms.guide.next.title"),
            description: t("page.product.forms.guide.next.description"),
            button: t("page.product.forms.guide.action"),
            onClick: () =>
              window.open(`${urls.docs.base}/forms/guides/react`, "_blank"),
          },
        ]}
      />
      <Pricing
        id="pricing"
        title={t("common.pricing.title")}
        text={t("common.pricing.description", { product: "Basestack Forms" })}
        segment={[
          {
            id: "monthly",
            text: t("common.pricing.segment.monthly"),
          },
          {
            id: "yearly",
            text: t("common.pricing.segment.yearly"),
            label: t("common.pricing.segment.discount"),
          },
        ]}
        items={plans.forms
          .filter(({ id }) => id !== "free")
          .map(
            ({ id, name, slogan, description, features, limits, ...plan }) => {
              const isEnterprise = id === "enterprise";

              const price = isEnterprise
                ? "Custom"
                : {
                    monthly: `$${formatNumber(plan.price.monthly.amount, "en-US", 0, 0)}`,
                    yearly: `$${formatNumber(plan.price.yearly.amount, "en-US", 2, 2)}`,
                  };

              return {
                isCustom: isEnterprise,
                title: name,
                price,
                button: isEnterprise
                  ? "Contact Us"
                  : t("common.pricing.action.get-started"),

                isPopular: id === "launch",
                ...(isEnterprise
                  ? {
                      list: [],
                      description: slogan,
                      listDescription: description,
                    }
                  : {
                      listDescription: t(
                        "common.pricing.info.preview-features",
                      ),
                      description: slogan,
                      list: [
                        {
                          text: t("page.product.forms.pricing.feature.forms", {
                            value: formatNumber(limits.forms),
                          }),
                          icon: "check",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.submissions",
                            {
                              value: formatNumber(limits.submissions),
                            },
                          ),
                          icon: "check",
                        },
                        {
                          text: t("page.product.forms.pricing.feature.spams", {
                            value: formatNumber(limits.spams),
                          }),
                          icon: "check",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.members",
                            {
                              value: formatNumber(limits.members),
                            },
                          ),
                          icon: limits.members > 0 ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.has-email-notifications",
                          ),
                          icon: features.hasEmailNotifications
                            ? "check"
                            : "close",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.has-webhooks",
                          ),
                          icon: features.hasWebhooks ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.has-custom-export",
                          ),
                          icon: features.hasCustomExport ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.has-custom-urls",
                          ),
                          icon: features.hasCustomUrls ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.forms.pricing.feature.has-security",
                          ),
                          icon:
                            features.hasWebsites || features.hasBlockIPs
                              ? "check"
                              : "close",
                        },
                      ],
                    }),
              };
            },
          )}
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
              events.landing.gotToGitHubRepo();
              window.open(urls.repo, "_blank");
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default ProductFormsPage;
