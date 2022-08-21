import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
// Server
import { inferQueryOutput, trpc } from "libs/trpc";
// Hooks
import { useMediaQuery } from "@basestack/hooks";
// Types
import { SelectedView } from "types/flags";
// Router
import { useRouter } from "next/router";
// Components
import { Text, Toolbar } from "@basestack/design-system";
import FlagCards from "./Cards";
import { Container } from "../styles";

const Flags = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.device.min.lg);

  const router = useRouter();
  const projectSlug = router.query.projectSlug as string;

  const [selectedView, setSelectedView] = useState<SelectedView>("cards");
  const [selectedEnvironment, setSelectedEnvironment] = useState("all");

  const { data, isLoading } = trpc.useQuery([
    "flag.byProjectSlug",
    { projectSlug, pagination: null },
  ]);

  console.log("data = ", data);

  useEffect(() => {
    if (!isDesktop) {
      setSelectedView("cards");
    }
  }, [isDesktop]);

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        onChangeView={(selected) => setSelectedView(selected as SelectedView)}
        my={theme.spacing.s5}
        onSearch={(event) => console.log(event.target.value)}
        environments={["Development", "Staging", "Production"]}
        onSelect={(environment) => setSelectedEnvironment(environment)}
      />

      <FlagCards projectSlug={projectSlug} selectedView={selectedView} />
    </Container>
  );
};

export default Flags;
