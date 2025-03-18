"use client";

import React, { Fragment } from "react";
// Components
import { AppsHero, OrderedCards, Cards } from "components";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { useTheme } from "styled-components";

const LandingPage = () => {
  const t = useTranslations();
  const { isDarkMode } = useTheme();

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
