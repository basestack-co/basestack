"use client";

import React, { Fragment } from "react";
// Components
import GetStarted from "./_components/GetStarted";
import RecentProjects from "./_components/RecentProjects";
import Teams from "./_components/Teams";
import Meters from "./user/tab/billing/_components/Meters/page";
// Utils
import dayjs from "dayjs";
// UI
import { Banners } from "@basestack/ui";
// Styles
import { Container } from "./_components/styles";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";

const MainPage = () => {
  const t = useTranslations("home");
  const { data, isLoading } = api.subscription.current.useQuery();

  const closeNoActiveSubscriptionBanner = useStore(
    (state) => state.closeNoActiveSubscriptionBanner,
  );

  const setCloseNoActiveSubscriptionBanner = useStore(
    (state) => state.setCloseNoActiveSubscriptionBanner,
  );

  return (
    <Fragment>
      <Banners
        onDismiss={() => setCloseNoActiveSubscriptionBanner(true)}
        data={[
          {
            title: t("usage.alert.no-subscription"),
            isVisible:
              data?.status !== "active" && !closeNoActiveSubscriptionBanner,
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
        <RecentProjects />
        <Teams />
        <GetStarted />
      </Container>
    </Fragment>
  );
};

export default MainPage;
