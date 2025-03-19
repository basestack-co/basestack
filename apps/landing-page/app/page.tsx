"use client";

import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
// Components
import { AppsHero, OrderedCards, Cards, VerticalCards } from "components";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { useTheme } from "styled-components";

const LandingPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();
  const router = useRouter();

  return (
    <Fragment>
      <AppsHero
        title={t("page.main.hero.title")}
        text={t("page.main.hero.description")}
        actions={[
          {
            id: "1",
            text: t("page.main.hero.action.learn-more"),
            href: "",
          },
          {
            id: "2",
            text: t("page.main.hero.action.request-demo"),
            href: "",
            isTertiary: true,
          },
        ]}
        data={[
          {
            icon: "flag",
            title: t("page.main.hero.card.flags.title"),
            text: t("page.main.hero.card.flags.description"),
            image: {
              src: `/images/product/flags/flags_cards_popups${isDarkMode ? "_dark" : ""}.png`,
              alt: "Product demo",
            },
          },
          {
            icon: "description",
            title: t("page.main.hero.card.forms.title"),
            text: t("page.main.hero.card.forms.description"),
            image: {
              src: `/images/product/forms/submissions${isDarkMode ? "_dark" : ""}.png`,
              alt: "Product demo",
            },
          },
          {
            icon: "campaign",
            title: t("page.main.hero.card.feedback.title"),
            text: t("page.main.hero.card.feedback.description"),
            image: {
              src: "",
              alt: "Product demo",
            },
            isDisabled: true,
          },
        ]}
      />
      <Cards
        title="Why choose basestack?"
        id="why"
        cards={[
          {
            title: "Open-Source Freedom",
            text: "Self-host for free or use our hosted version.",
            icon: "code",
          },
          {
            title: "Scales with You",
            text: "From solo projects to startup teams, we’ve got you covered.",
            icon: "trending_up",
          },
          {
            title: "No Lock-In",
            text: "Flexible tools that adapt to your stack, not the other way around.",
            icon: "lock_open",
          },
        ]}
      />
      <VerticalCards
        title="Product Highlights"
        id="highlights"
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
            title: "User Feedback",
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
      <OrderedCards
        id="how"
        title="How It Works"
        // TODO update or remove
        text="Simplify your workflow with our tools that provide clear insights, minimizing the complexity of managing intricate deployment data."
        data={[
          {
            title: "Pick Your Product",
            text: "Choose Forms, Feature Flags, or both.",
            image: {
              src: ``,
              alt: "Random product selection image",
            },
          },
          {
            title: "Set It Up",
            text: "Self-host or use our cloud—no steep learning curve.",
            image: {
              src: ``,
              alt: "Random setup process image",
            },
          },
          {
            title: "Start Building",
            text: "Integrate and go live fast.",
            image: {
              src: ``,
              alt: "Random building process image",
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default LandingPage;
