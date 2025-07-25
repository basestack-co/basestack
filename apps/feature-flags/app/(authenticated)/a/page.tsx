"use client";

// UI
import { Banners } from "@basestack/ui";
// Utils
import dayjs from "dayjs";
// Locales
import { useTranslations } from "next-intl";
import { Fragment } from "react";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Components
import GetStarted from "./_components/GetStarted";
import RecentProjects from "./_components/RecentProjects";
// Styles
import { Container } from "./_components/styles";
import Teams from "./_components/Teams";
import Meters from "./user/tab/billing/_components/Meters/page";

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
