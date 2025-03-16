"use client";

import React, { Fragment } from "react";
// Components
import { AppsHero } from "components";
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
    </Fragment>
  );
};

export default LandingPage;
