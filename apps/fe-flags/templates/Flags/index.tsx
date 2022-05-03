import React from "react";
import { FlagCard, Text, Toolbar } from "design-system";
import { Container, FlagsContainer } from "./styles";
import { useTheme } from "styled-components";
import { mockFlags } from "./mockData";

const Flags = () => {
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge">Flags</Text>
      <Toolbar
        onChangeView={(selected) => console.log("selected view = ", selected)}
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

export default Flags;
