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
  Questions,
} from "components";
import { useStore } from "store";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { config as defaults } from "@basestack/utils";

const { urls } = defaults;

const LandingPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const stargazers = useStore((state) => state.stargazers);

  console.log("stargazers = ", stargazers);

  return (
    <Fragment>
      <VerticalCards
        header={{
          titleTag: "h1",
          titleSize: "xLarge",
          title: t("page.main.hero.title"),
          text: t("page.main.hero.description"),
          titleMaxWidth: 30,
        }}
        actions={[
          {
            id: "1",
            text: t("page.main.hero.action.quote"),
            onClick: () => router.push("/enterprise"),
          },
          {
            id: "2",
            text: t("page.main.hero.action.request-demo"),
            onClick: () => router.push("/contact"),
            isTertiary: true,
          },
        ]}
        cards={[
          {
            onClick: () => router.push("/product/feature-flags"),
            icon: "flag",
            title: t("page.main.hero.card.flags.title"),
            text: t("page.main.hero.card.flags.description"),
            items: [
              t("page.main.hero.card.flags.feature.1"),
              t("page.main.hero.card.flags.feature.2"),
              t("page.main.hero.card.flags.feature.3"),
              t("page.main.hero.card.flags.feature.4"),
              t("page.main.hero.card.flags.feature.5"),
              t("page.main.hero.card.flags.feature.6"),
              t("page.main.hero.card.flags.feature.7"),
            ],
          },
          {
            onClick: () => router.push("product/forms"),
            icon: "description",
            title: t("page.main.hero.card.forms.title"),
            text: t("page.main.hero.card.forms.description"),
            items: [
              t("page.main.hero.card.forms.feature.1"),
              t("page.main.hero.card.forms.feature.2"),
              t("page.main.hero.card.forms.feature.3"),
              t("page.main.hero.card.forms.feature.4"),
              t("page.main.hero.card.forms.feature.5"),
              t("page.main.hero.card.forms.feature.6"),
              t("page.main.hero.card.forms.feature.7"),
            ],
          },
          {
            icon: "campaign",
            title: t("page.main.hero.card.feedback.title"),
            text: t("page.main.hero.card.feedback.description"),
            items: [
              t("page.main.hero.card.feedback.feature.1"),
              t("page.main.hero.card.feedback.feature.2"),
              t("page.main.hero.card.feedback.feature.3"),
              t("page.main.hero.card.feedback.feature.4"),
              t("page.main.hero.card.feedback.feature.5"),
              t("page.main.hero.card.feedback.feature.6"),
              t("page.main.hero.card.feedback.feature.7"),
            ],
          },
        ]}
      />
      <Cards
        caption={t("page.main.why.caption")}
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
        caption={t("page.main.who.caption")}
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
        caption={t("page.main.how-it-works.caption")}
        title={t("page.main.how-it-works.title")}
        text={t("page.main.how-it-works.description")}
        data={[
          {
            title: t("page.main.how-it-works.step.one.title"),
            text: t("page.main.how-it-works.step.one.description"),
            icon: "layers",
          },
          {
            title: t("page.main.how-it-works.step.two.title"),
            text: t("page.main.how-it-works.step.two.description"),
            icon: "tune",
          },
          {
            title: t("page.main.how-it-works.step.three.title"),
            text: t("page.main.how-it-works.step.three.description"),
            icon: "trending_up",
          },
        ]}
      />
      <AutoSlidingCards
        caption={t("page.main.use-cases.caption")}
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

      <Questions
        id="questions"
        title={t("common.questions.title")}
        text={t("common.questions.description", {
          product: "Basestack Platform",
        })}
        data={[
          {
            title: t("common.questions.7.title"),
            text: t("common.questions.7.description"),
          },
          {
            title: t("common.questions.8.title"),
            text: t("common.questions.8.description"),
          },
          {
            title: t("common.questions.9.title"),
            text: t("common.questions.9.description"),
          },
          {
            title: t("common.questions.10.title"),
            text: t("common.questions.10.description"),
          },
          {
            title: t("common.questions.11.title"),
            text: t("common.questions.11.description"),
          },
          {
            title: t("common.questions.12.title"),
            text: t("common.questions.12.description"),
          },
          {
            title: t("common.questions.13.title"),
            text: t("common.questions.13.description"),
          },
          {
            title: t("common.questions.14.title"),
            text: t("common.questions.14.description"),
          },
          {
            title: t("common.questions.15.title"),
            text: t("common.questions.15.description"),
          },
          {
            title: t("common.questions.17.title"),
            text: t("common.questions.17.description"),
          },
        ]}
      />

      <Banner
        stars={stargazers}
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
