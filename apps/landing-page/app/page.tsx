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
              src: "/images/flags_multiple_projects.png",
              alt: "An image of a feature flag control panel displaying multiple projects and environments, with intuitive controls for easily managing feature releases.",
            },
          },
          {
            icon: "description",
            title: t("page.main.hero.card.forms.title"),
            text: t("page.main.hero.card.forms.description"),
            image: {
              src: "/images/flag_history.png",
              alt: "An image of a feature flag dashboard displaying streamlined management, monitoring, and automated change tracking features. The dashboard provides clear and concise data visualization and intuitive controls for easy navigation and management.",
            },
          },
          {
            icon: "campaign",
            title: t("page.main.hero.card.feedback.title"),
            text: t("page.main.hero.card.feedback.description"),
            image: {
              src: "/images/create_flag_advanced.png",
              alt: "An image of a feature flag configuration interface, displaying dynamic payload data changes. The interface provides intuitive controls for easily making and testing feature flag changes.",
            },
          },
        ]}
      />
    </Fragment>
  );
};

export default LandingPage;
