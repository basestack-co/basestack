import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";
// Hooks
import { useMediaQuery } from "@basestack/hooks";
// Types
import { Project, SelectedView } from "types";
// Store
import { useStore } from "store";
// Components
import { Text } from "@basestack/design-system";
import toast from "react-hot-toast";
import FlagCards from "./Cards";
import { Container } from "../styles";
// Containers
import Toolbar from "./Toolbar";

export interface Props {
  project: Project;
}

const Flags = ({ project }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);
  const setSelectedView = useStore((state) => state.setSelectedView);
  const selectedView = useStore((state) => state.selectedView);
  const [searchValue, setSearchValue] = useState<string>("");

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

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        onChangeView={onChangeView}
        onSearchCallback={(value) => setSearchValue(value)}
        isDesktop={isDesktop}
        selectedView={selectedView}
      />
      <FlagCards
        projectId={project?.id!}
        selectedView={selectedView}
        searchValue={searchValue}
      />
    </Container>
  );
};

export default Flags;
