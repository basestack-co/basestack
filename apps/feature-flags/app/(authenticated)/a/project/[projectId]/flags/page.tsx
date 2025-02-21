"use client";

import React, { useCallback, useEffect, useState } from "react";
// Hooks
import { useMedia } from "react-use";
// Store
import { useStore } from "store";
// Components
import { Text } from "@basestack/design-system";
import FlagsList from "./_components/FlagsList";
import Toolbar from "./_components/Toolbar";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { useTheme } from "styled-components";
import { FlagsListContainer } from "./_components/FlagsList/styles";
// Types
import { SelectedView } from "types";
import { PlanTypeId } from "@basestack/utils";
// Server
import { api } from "utils/trpc/react";

const FlagsPage = () => {
  const t = useTranslations("flag");
  const theme = useTheme();
  const isDesktop = useMedia(theme.device.min.lg, false);
  const setActivityModalOpen = useStore((state) => state.setActivityModalOpen);
  const setSelectedView = useStore((state) => state.setSelectedView);
  const selectedView = useStore((state) => state.selectedView);
  const [searchValue, setSearchValue] = useState<string>("");
  const { projectId } = useParams<{ projectId: string }>();

  const [{ data: project }, usage] = api.useQueries((t) => [
    t.project.byId({ projectId }, { enabled: !!projectId }),
    t.subscription.usage(undefined, { enabled: !!projectId }),
  ]);

  const planId = (usage.data?.planId ?? PlanTypeId.FREE) as PlanTypeId;

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
          selectedView={selectedView}
          onClickActivity={onClickActivity}
        />
        <FlagsList
          projectId={projectId}
          selectedView={selectedView}
          searchValue={searchValue}
          planId={planId}
        />
      </FlagsListContainer>
    </>
  );
};

export default FlagsPage;
