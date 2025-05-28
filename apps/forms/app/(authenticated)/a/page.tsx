"use client";

import React, { Fragment } from "react";
// Components
import AccountUsage from "./_components/AccountUsage";
import RecentForms from "./_components/RecentForms";
import QuickLinks from "./_components/QuickLinks";
import Teams from "./_components/Teams";
// UI
import { Banners } from "@basestack/ui";
// Styles
import { Container } from "./styles";
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
        <RecentForms />
        <Teams />
        <QuickLinks />
      </Container>
    </Fragment>
  );
};

export default MainPage;
