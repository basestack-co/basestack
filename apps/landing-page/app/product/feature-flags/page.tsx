"use client";

import React, { Fragment } from "react";
import { config as defaults, formatNumber } from "@basestack/utils";
// Components
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
} from "components";
// Icons
import { JavascriptIcon, JsonIcon, ReactIcon } from "components/Code/icons";
// Styles
import { useTheme } from "styled-components";
// Locales
import { useTranslations } from "next-intl";

const { plans, urls } = defaults;

const ProductFeatureFlagsPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();

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
          /* {
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
          text: t("navigation.product.get-started.title"),
          href: urls.app.production.flags,
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
            text: t("page.product.flags.hero.action.get-free"),
            href: urls.app.production.flags,
            isExternal: true,
          },
          {
            id: "2",
            text: t("page.product.flags.hero.action.request-demo"),
            href: "/contact",
            isTertiary: true,
            isExternal: false,
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
      {/*
      <Pricing
        id="pricing"
        product="flags"
        title={t("common.pricing.title")}
        text={t("common.pricing.description", {
          product: "Basestack Feature Flags",
        })}
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
        items={plans.flags
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
                          text: t(
                            "page.product.flags.pricing.feature.projects",
                            {
                              value: formatNumber(limits.projects),
                            },
                          ),
                          icon: "check",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.environments",
                            {
                              value: formatNumber(limits.environments),
                            },
                          ),
                          icon: "check",
                        },
                        {
                          text: t("page.product.flags.pricing.feature.flags", {
                            value: formatNumber(limits.flags),
                          }),
                          icon: "check",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.api-requests",
                            {
                              value: formatNumber(limits.apiRequests),
                            },
                          ),
                          icon: "check",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.members",
                            {
                              value: formatNumber(limits.members),
                            },
                          ),
                          icon: limits.members > 0 ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.has-security",
                          ),
                          icon:
                            features.hasWebsites || features.hasBlockIPs
                              ? "check"
                              : "close",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.has-history",
                          ),
                          icon: features.hasHistory ? "check" : "close",
                        },
                        {
                          text: t(
                            "page.product.flags.pricing.feature.has-remote-config",
                          ),
                          icon: features.hasRemoteConfig ? "check" : "close",
                        },
                      ],
                    }),
              };
            },
          )}
      /> */}
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
