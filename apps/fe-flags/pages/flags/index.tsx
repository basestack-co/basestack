import React from "react";
import { useTheme } from "styled-components";
// Layout
import MainLayout from "../../layouts/Main";
import { Text, Toolbar, FlagCard } from "design-system";
import { Container, FlagsContainer } from "./styles";

import { mockFlags } from "./mockData";

const FlagsPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        my={theme.spacing.s5}
        onSearch={(event) => console.log(event.target.value)}
        environments={["Development", "Staging", "Production"]}
        onSelect={(environment) => console.log(environment)}
      />
      <FlagsContainer>
        {mockFlags.map((flag, index) => {
          return (
            <FlagCard
              key={index.toString()}
              title={flag.title}
              description={flag.description}
              environments={flag.environments}
              date={flag.date}
            />
          );
        })}
      </FlagsContainer>
    </Container>
  );
};

FlagsPage.Layout = MainLayout;

export default FlagsPage;
