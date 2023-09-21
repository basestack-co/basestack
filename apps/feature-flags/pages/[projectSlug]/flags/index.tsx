import React, { useCallback, useEffect, useState } from "react";
// SEO
import Head from "next/head";
// Hooks
import { useMedia } from "react-use";
// Layout
import MainLayout from "layouts/Main";
// Store
import { useStore } from "store";
// Components
import { Text } from "@basestack/design-system";
import FlagsList from "components/FlagsList";
import Toolbar from "components/Toolbar";
// Router
import { useRouter } from "next/router";
// Locales
import useTranslation from "next-translate/useTranslation";
// Styles
import { useTheme } from "styled-components";
import { FlagsListContainer } from "components/FlagsList/styles";
// Types
import { SelectedView } from "types";
// Server
import { trpc } from "libs/trpc";

const FlagsPage = () => {
  const { t } = useTranslation("flags");
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const setActivityModalOpen = useStore((state) => state.setActivityModalOpen);
  const setSelectedView = useStore((state) => state.setSelectedView);
  const selectedView = useStore((state) => state.selectedView);
  const [searchValue, setSearchValue] = useState<string>("");
  const projectSlug = router.query.projectSlug as string;

  const { data } = trpc.project.bySlug.useQuery(
    { projectSlug },
    {
      enabled: !!projectSlug,
    },
  );

  useEffect(() => {
    if (!isDesktop) {
      setSelectedView({ view: "cards" });
    }
  }, [isDesktop, setSelectedView]);

  const onChangeView = useCallback(
    (selected: string) => {
      setSelectedView({ view: selected as SelectedView });
    },
    [setSelectedView],
  );

  const onClickActivity = useCallback(() => {
    setActivityModalOpen({ isOpen: true });
  }, [setActivityModalOpen]);

  return (
    <>
      <Head>
        <title>
          {data?.project?.name ?? "Project"} / {t("seo.title")}
        </title>
      </Head>
      <FlagsListContainer>
        <Text size="xLarge">{t("page.title")}</Text>
        <Toolbar
          onChangeView={onChangeView}
          onSearchCallback={(value) => setSearchValue(value)}
          isDesktop={isDesktop}
          selectedView={selectedView}
          onClickActivity={onClickActivity}
        />
        <FlagsList
          projectId={data?.project?.id!}
          selectedView={selectedView}
          searchValue={searchValue}
        />
      </FlagsListContainer>
    </>
  );
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
