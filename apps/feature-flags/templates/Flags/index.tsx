import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";
// Hooks
import { useMediaQuery } from "@basestack/hooks";
// Types
import { SelectedView } from "types/flags";
// Router
import { useRouter } from "next/router";
// Components
import { Text } from "@basestack/design-system";
import FlagCards from "./Cards";
import { Container } from "../styles";
// Containers
import Toolbar from "./Toolbar";

const Flags = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);

  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;

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
        projectSlug={projectSlug}
        onChangeView={onChangeView}
        onSearch={onSearch}
        onSelect={onSelectEnvironment}
        isDesktop={isDesktop}
      />

      <FlagCards projectSlug={projectSlug} selectedView={selectedView} />
    </Container>
  );
};

export default Flags;
