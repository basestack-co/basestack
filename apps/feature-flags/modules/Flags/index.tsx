import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";
// Hooks
import { useMediaQuery } from "@basestack/hooks";
// Types
import { SelectedView } from "types/flags";
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

  const [selectedView, setSelectedView] = useState<SelectedView>("cards");
  const [selectedEnvironmentId, setSelectedEnvironmentId] =
    useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (!isDesktop) {
      setSelectedView("cards");
    }
  }, [isDesktop]);

  const onChangeView = useCallback((selected: string) => {
    setSelectedView(selected as SelectedView);
  }, []);

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        projectId={project?.id!}
        onChangeView={onChangeView}
        onSearch={onSearch}
        searchValue={searchValue}
        onSelect={(id: string) => setSelectedEnvironmentId(id)}
        isDesktop={isDesktop}
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
