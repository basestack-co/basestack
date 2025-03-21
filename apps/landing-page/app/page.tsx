"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import {
  OrderedCards,
  Cards,
  VerticalCards,
  Banner,
  MiniCards,
  AutoSlidingCards,
} from "components";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config as defaults } from "@basestack/utils";

const { urls } = defaults;

const LandingPage = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Fragment>
      <VerticalCards
        header={{
          titleTag: "h1",
          titleSize: "xLarge",
          title: t("page.main.hero.title"),
          text: "Explore our powerful tools designed to simplify feature management, streamline user interactions, and gather valuable feedback — all in one place.",
          hasAnimatedText: true,
        }}
        actions={[
          {
            id: "1",
            text: "Start Now",
            href: "",
          },
          {
            id: "2",
            text: "Go Now",
            href: "",
            isTertiary: true,
          },
        ]}
        cards={[
          {
            onClick: () => router.push("/product/feature-flags"),
            color: "blue",
            icon: "flag",
            title: "Feature Flags",
            text: "Effortlessly control feature rollouts and toggle settings instantly.",
            items: [
              "Granular user targeting",
              "Remote configuration",
              "A/B testing support",
              "Instant rollback",
              "CI/CD integration",
              "Multi-environment support",
              "Scalable to high traffic",
            ],
          },
          {
            onClick: () => router.push("product/forms"),
            color: "yellow",
            icon: "description",
            title: "Dynamic Forms",
            text: "Design intuitive, customizable forms that adapt to user inputs.",
            items: [
              "Drag-and-drop builder",
              "Real-time validation",
              "Third-party integrations",
              "Multi-step progress",
              "Accessible design",
              "Submission analytics",
              "GDPR compliance",
            ],
          },
          {
            color: "green",
            icon: "campaign",
            title: "User Feedback (Soon)",
            text: "Gain valuable insights directly from your users to optimize experiences.",
            items: [
              "Customizable widgets",
              "Sentiment analysis",
              "Real-time reports",
              "Feedback tagging",
              "Slack/Email alerts",
              "Anonymous feedback",
              "Data export options",
            ],
          },
        ]}
      />
      <Cards
        title={t("page.main.why.title")}
        text={t("page.main.why.description")}
        cards={[
          {
            title: t("page.main.why.card.open.title"),
            text: t("page.main.why.card.open.description"),
            icon: "code",
          },
          {
            title: t("page.main.why.card.scale.title"),
            text: t("page.main.why.card.scale.description"),
            icon: "trending_up",
          },
          {
            title: t("page.main.why.card.learning.title"),
            text: t("page.main.why.card.learning.description"),
            icon: "school",
          },
        ]}
      />
      <MiniCards
        title={t("page.main.who.title")}
        text={t("page.main.who.description")}
        cards={[
          {
            title: t("page.main.who.card.solo.title"),
            description: t("page.main.who.card.solo.description"),
            icon: "person",
          },
          {
            title: t("page.main.who.card.teams.title"),
            description: t("page.main.who.card.teams.description"),
            icon: "groups",
          },
          {
            title: t("page.main.who.card.startups.title"),
            description: t("page.main.who.card.startups.description"),
            icon: "rocket_launch",
          },
          {
            title: t("page.main.who.card.enterprises.title"),
            description: t("page.main.who.card.enterprises.description"),
            icon: "corporate_fare",
          },
        ]}
      />
      <OrderedCards
        title={t("page.main.how-it-works.title")}
        text={t("page.main.how-it-works.description")}
        data={[
          {
            title: t("page.main.how-it-works.step.one.title"),
            text: t("page.main.how-it-works.step.one.description"),
            image: {
              src: ``,
              alt: "Random product selection image",
            },
          },
          {
            title: t("page.main.how-it-works.step.two.title"),
            text: t("page.main.how-it-works.step.two.description"),
            image: {
              src: ``,
              alt: "Random setup process image",
            },
          },
          {
            title: t("page.main.how-it-works.step.three.title"),
            text: t("page.main.how-it-works.step.three.description"),
            image: {
              src: ``,
              alt: "Random building process image",
            },
          },
        ]}
      />
      <AutoSlidingCards
        title={t("page.main.use-cases.title")}
        text={t("page.main.use-cases.description")}
        cards={[
          {
            text: `"${t("page.main.use-cases.card.flags.one")}"`,
            icon: "flag",
          },
          {
            text: `"${t("page.main.use-cases.card.forms.one")}"`,
            icon: "description",
          },
          {
            text: `"${t("page.main.use-cases.card.flags.two")}"`,
            icon: "flag",
          },
          {
            text: `"${t("page.main.use-cases.card.forms.two")}"`,
            icon: "description",
          },
          {
            text: `"${t("page.main.use-cases.card.flags.three")}"`,
            icon: "flag",
          },
          {
            text: `"${t("page.main.use-cases.card.forms.three")}"`,
            icon: "description",
          },
          {
            text: `"${t("page.main.use-cases.card.flags.four")}"`,
            icon: "flag",
          },
          {
            text: `"${t("page.main.use-cases.card.forms.four")}"`,
            icon: "description",
          },
        ]}
      />
      <Banner
        title={t("page.main.community.title")}
        text={t("page.main.community.description")}
        buttons={[
          {
            text: t("page.main.community.action.explore"),
            onClick: () => {
              window.open(`${urls.docs.base}/self-hosting`, "_blank");
            },
          },
          {
            text: t("page.main.community.action.involved"),
            onClick: () => {
              window.open(`${urls.repo}/discussions`, "_blank");
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default LandingPage;
