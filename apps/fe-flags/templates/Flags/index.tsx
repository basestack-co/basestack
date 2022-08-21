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

  const onSelectEnv = useCallback(() => {}, [])

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        projectSlug={projectSlug}
        onChangeView={(selected) => setSelectedView(selected as SelectedView)}
        onSearch={(event) => console.log(event.target.value)}
        onSelect={(environment) => setSelectedEnvironment(environment)}
      />

      <FlagCards projectSlug={projectSlug} selectedView={selectedView} />
    </Container>
  );
};

export default Flags;
