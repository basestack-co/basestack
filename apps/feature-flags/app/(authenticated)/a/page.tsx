"use client";

import React, { Fragment } from "react";
// Components
import GetStarted from "./_components/GetStarted";
import RecentProjects from "./_components/RecentProjects";
import Teams from "./_components/Teams";
import AccountUsage from "./_components/AccountUsage";
// UI
import { Banners } from "@basestack/ui";
// Styles
import { Container } from "./_components/styles";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";

const MainPage = () => {
  const t = useTranslations("home");
  const { data } = api.subscription.current.useQuery();

  return (
    <Fragment>
      <Banners
        data={[
          {
            title: t("usage.alert.no-subscription"),
            isVisible: data?.status !== "active",
          },
        ]}
      />
      <Container>
        <AccountUsage />
        <RecentProjects />
        <Teams />
        <GetStarted />
      </Container>
    </Fragment>
  );
};

export default MainPage;
