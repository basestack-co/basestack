"use client";

// Components
import { Text } from "@basestack/design-system";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
// Hooks
import { useMedia } from "react-use";
// Store
import { useStore } from "store";
// Styles
import { useTheme } from "styled-components";
// Types
import type { SelectedView } from "types";
// Server
import { api } from "utils/trpc/react";
import FlagsList from "./_components/FlagsList";
import { FlagsListContainer } from "./_components/FlagsList/styles";
import Toolbar from "./_components/Toolbar";

const FlagsPage = () => {
  const t = useTranslations("flag");
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const setActivityModalOpen = useStore((state) => state.setActivityModalOpen);
  const setSelectedView = useStore((state) => state.setSelectedView);
  const selectedView = useStore((state) => state.selectedView);
  const [searchValue, setSearchValue] = useState<string>("");
  const { projectId } = useParams<{ projectId: string }>();

  const { data: project } = api.projects.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
    },
  );

  const onChangeView = useCallback(
    (selected: string) => {
      setSelectedView({ view: selected as SelectedView });
    },
    [setSelectedView],
  );

  const onClickActivity = useCallback(() => {
    setActivityModalOpen({ isOpen: true });
  }, [setActivityModalOpen]);

  useEffect(() => {
    document.title = `${project?.name ?? "Project"} / ${t("seo.title")}`;
  }, [project?.name, t]);

  return (
    <>
      <FlagsListContainer>
        <Text size="xLarge">{t("page.title")}</Text>
        <Toolbar
          onChangeView={onChangeView}
          onSearchCallback={(value) => setSearchValue(value)}
          isDesktop={isDesktop}
          selectedView={isDesktop ? selectedView : "cards"}
          onClickActivity={onClickActivity}
        />
        <FlagsList
          projectId={projectId}
          selectedView={selectedView}
          searchValue={searchValue}
          projectRole={project?.role}
        />
      </FlagsListContainer>
    </>
  );
};

export default FlagsPage;
