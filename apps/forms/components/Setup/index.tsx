import React from "react";
import { useTheme } from "styled-components";
import { HorizontalRule } from "@basestack/design-system";
import EndpointCard from "./EndpointCard";
import SetupGuide from "./SetupGuide";
import Form from "./Form";
import { Container, Grid } from "./styles";

const Setup = () => {
  const theme = useTheme();

  return (
    <Container>
      <EndpointCard />
      <HorizontalRule my={theme.spacing.s5} isDarker />
      <Grid>
        <SetupGuide />
        <Form />
      </Grid>
    </Container>
  );
};

export default Setup;
