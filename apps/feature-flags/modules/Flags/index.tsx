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
import { inferQueryOutput } from "libs/trpc";

export interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

const Flags = ({ project }: Props) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);

  const [selectedView, setSelectedView] = useState<SelectedView>("cards");
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  useEffect(() => {
    if (!isDesktop) {
      setSelectedView("cards");
    }
  }, [isDesktop]);

  const onChangeView = useCallback((selected: string) => {
    setSelectedView(selected as SelectedView);
  }, []);

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const onSelectEnvironment = useCallback((environment: string) => {
    setSelectedEnvironment(environment);
  }, []);

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        projectSlug={project?.slug!}
        onChangeView={onChangeView}
        onSearch={onSearch}
        onSelect={onSelectEnvironment}
        isDesktop={isDesktop}
      />

      <FlagCards projectSlug={project?.slug!} selectedView={selectedView} />
    </Container>
  );
};

export default Flags;
