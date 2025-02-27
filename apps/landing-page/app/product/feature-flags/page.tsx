"use client";

import React, { Fragment } from "react";
import { config, config as defaults, events } from "@basestack/utils";
// Components
import {
  Hero,
  Footer,
  Banner,
  Cards,
  Questions,
  Slider,
  Code,
  GlobalNavigation,
  Pricing,
  ProductNavigation,
  MiniCards,
} from "components";
import { JavascriptIcon, JsonIcon, ReactIcon } from "components/Code/icons";
// Locales
import { useTranslations } from "next-intl";

const ProductFeatureFlagsPage = () => {
  const t = useTranslations();

  return (
    <Fragment>
      <GlobalNavigation isSticky={false} />
      <ProductNavigation
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
          {
            text: t("navigation.product.self-hosting.title"),
            href: "#sdks",
            icon: "host",
          },
          {
            text: t("navigation.product.docs.title"),
            href: defaults.urls.docs.base,
            icon: "docs",
            isExternal: true,
          },
          {
            text: t("navigation.product.roadmap.title"),
            href: "#features",
            icon: "road",
          },
        ]}
        button={{
          text: t("navigation.product.get-started.title"),
          href: defaults.urls.app.production.flags,
        }}
      />
      <Hero
        title={t("page.product.flags.hero.title")}
        text={t("page.product.flags.hero.description")}
        actions={[
          {
            id: "1",
            text: t("page.product.flags.hero.action.get-free"),
            href: defaults.urls.app.production.flags,
          },
          {
            id: "2",
            text: t("page.product.flags.hero.action.request-demo"),
            href: defaults.urls.app.production.flags,
            isTertiary: true,
          },
        ]}
        image={{
          src: "/images/flags_cards_popups.png",
          alt: "product demo",
        }}
      />
      <Slider
        id="features"
        title={t("page.product.flags.features.title")}
        text={t("page.product.flags.features.description")}
        data={[
          {
            icon: "flag",
            title: t("page.product.flags.features.slide.one.title"),
            text: t("page.product.flags.features.slide.one.description"),
            image: {
              src: "/images/flags_multiple_projects.png",
              alt: t("page.product.flags.features.slide.one.alt"),
            },
          },
          {
            icon: "history",
            title: t("page.product.flags.features.slide.two.title"),
            text: t("page.product.flags.features.slide.two.description"),
            image: {
              src: "/images/flag_history.png",
              alt: t("page.product.flags.features.slide.two.alt"),
            },
          },
          {
            icon: "send",
            title: t("page.product.flags.features.slide.three.title"),
            text: t("page.product.flags.features.slide.three.description"),
            image: {
              src: "/images/create_flag_advanced.png",
              alt: t("page.product.flags.features.slide.three.alt"),
            },
          },
        ]}
      />
      <MiniCards
        id="mini-cards"
        title={t("page.product.flags.more-features.title")}
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
            icon: "undo",
          },
          {
            title: t(
              "page.product.flags.more-features.card.bootstrapping.title",
            ),
            description: t(
              "page.product.flags.more-features.card.bootstrapping.description",
            ),
            icon: "task",
          },
          {
            title: t("page.product.flags.more-features.card.admin.title"),
            description: t(
              "page.product.flags.more-features.card.admin.description",
            ),
            icon: "admin_panel_settings",
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
                `${defaults.urls.docs.base}/feature-flags/sdks/react`,
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
                `${defaults.urls.docs.base}/feature-flags/sdks/javascript`,
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
                `${defaults.urls.docs.base}/feature-flags/sdks/rest-api`,
                "_blank",
              ),
          },
        ]}
      />
      <Cards
        id="why"
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
      <Pricing
        id="pricing"
        title="Pricing"
        text="Flags provides an all-in-one platform for developing, implementing, and managing your feature flags."
        items={[
          {
            title: "Free",
            price: {
              monthly: "$0",
              yearly: "$0",
            },
            button: "Start for Free",
            description: "To kickstart your projects, no credit card required.",
            list: [
              "10 000 flags per project",
              "5 environments per team",
              "10 project per organization",
              "Enterprise use",
            ],
          },
          {
            isPopular: true,
            title: "Pro",
            price: {
              monthly: "$19",
              yearly: "$17",
            },
            button: "Get Started",
            description:
              "The resources, features, and support you need to launch.",
            listDescription: "Everything in Free, plus...",
            list: [
              "10 000 flags per project",
              "5 environments per team",
              "10 project per organization",
              "Enterprise use",
            ],
          },
          {
            title: "Team",
            price: {
              monthly: "$69",
              yearly: "$52",
            },
            button: "Get Started",
            description:
              "More capacity and functionality for scaling production workloads.",
            listDescription: "Everything in Pro, plus...",
            list: [
              "10 000 flags per project",
              "5 environments per team",
              "10 project per organization",
              "Enterprise use",
            ],
          },
          {
            isCustom: true,
            title: "Enterprise",
            price: "Custom",
            button: "Contact Us",
            description:
              "For larger workloads, with best compliance and security.",
            listDescription: "Everything in Team, plus...",
            list: [
              "10 000 flags per project",
              "5 environments per team",
              "10 project per organization",
              "Enterprise use",
            ],
          },
        ]}
      />
      <Questions
        id="questions"
        title="Frequently Asked Questions"
        text="Explore our collection of useful questions and answers about the Feature Flags Platform. If you don't find the answer to your question here, feel free to open a discussion on Github."
        data={[
          {
            title: "What are the requirements for self-hosting?",
            text: "Any service that can host a NextJS applications with serverless function support and provide a Postgres database compatible with serverless environments will work seamlessly. Consider services such as Neon, Supabase, or traditional Postgres with connection pooling like PgBouncer.",
          },
          {
            title: "What are the supported databases?",
            text: "The platform uses PostgreSQL as the database. The crucial aspect here is to ensure that the PostgreSQL service or instance supports serverless environments.",
          },
        ]}
      />
      <Banner
        id="banner"
        title="Ready to Ship Your Code with Confidence?"
        text="Basestack Feature Flags is a user-friendly platform that simplifies the development, implementation."
        buttons={[
          {
            text: "Get Started",
            onClick: () => {
              events.landing.goToDocs();
              window.open(config.urls.docs.flags.base, "_blank");
            },
          },
          {
            text: "Star Us on GitHub",
            onClick: () => {
              events.landing.gotToGitHubRepo();
              window.open(config.urls.repo, "_blank");
            },
          },
        ]}
      />
      <Footer />
    </Fragment>
  );
};

export default ProductFeatureFlagsPage;
