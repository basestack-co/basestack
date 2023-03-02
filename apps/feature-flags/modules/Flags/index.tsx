import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";
// Hooks
import { useMediaQuery } from "@basestack/hooks";
// Types
import { SelectedView } from "types/flags";
// Store
import { useStore } from "store";
// Components
import { Text } from "@basestack/design-system";
import FlagCards from "./Cards";
import { Container } from "../styles";
// Containers
import Toolbar from "./Toolbar";
// Libs
import { RouterOutput, trpc } from "libs/trpc";

export interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const Flags = ({ project }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const setSelectedView = useStore((state) => state.setSelectedView);
  const selectedView = useStore((state) => state.selectedView);
  const [selectedEnvironmentId, setSelectedEnvironmentId] =
    useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (!isDesktop) {
      // TODO: Update this to be desktop first
      // setSelectedView({ view: "cards" });
    }
  }, [isDesktop, setSelectedView]);

  const onChangeView = useCallback(
    (selected: string) => {
      setSelectedView({ view: selected as SelectedView });
    },
    [setSelectedView]
  );

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        projectId={project?.id!}
        onChangeView={onChangeView}
        onSearchCallback={(value) => setSearchValue(value)}
        onSelect={(id: string) => setSelectedEnvironmentId(id)}
        isDesktop={isDesktop}
        selectedView={selectedView}
      />

      <FlagCards
        projectId={project?.id!}
        environmentId={selectedEnvironmentId}
        selectedView={selectedView}
        searchValue={searchValue}
      />
    </Container>
  );
};

export default Flags;
