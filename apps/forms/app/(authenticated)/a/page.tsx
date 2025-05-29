"use client";

import React, { Fragment } from "react";
// Components
import RecentForms from "./_components/RecentForms";
import QuickLinks from "./_components/QuickLinks";
import Teams from "./_components/Teams";
import Meters from "./user/tab/billing/_components/Meters/page";
// Utils
import dayjs from "dayjs";
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
  const { data, isLoading } = api.subscription.current.useQuery();

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
        <Meters
          isLoadingSubscription={isLoading}
          numberOfMeters={4}
          title={t("usage.title")}
          date={
            data?.currentPeriodEnd
              ? t("usage.date", {
                  date: dayjs(data?.currentPeriodEnd).format("MMMM D, YYYY"),
                })
              : ""
          }
          link={
            data?.status === "active"
              ? t("usage.link.manage")
              : t("usage.link.upgrade")
          }
          href="/a/user/tab/billing"
        />
        <RecentForms />
        <Teams />
        <QuickLinks />
      </Container>
    </Fragment>
  );
};

export default MainPage;
