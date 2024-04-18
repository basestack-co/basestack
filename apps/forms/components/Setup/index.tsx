import React from "react";
import { useTheme } from "styled-components";
import { HorizontalRule } from "@basestack/design-system";
import EndpointCard from "./EndpointCard";
import SetupGuide from "./SetupGuide";
import Links from "./Links";
import Form from "./Form";
import { Container, Row, Column } from "./styles";

const Setup = () => {
  const theme = useTheme();

  return (
    <Container>
      <EndpointCard />
      <HorizontalRule my={theme.spacing.s5} isDarker />
      <Row>
        <Column>
          <SetupGuide />
        </Column>
        <Column>
          <Form />
          <Links />
        </Column>
      </Row>
    </Container>
  );
};

export default Setup;
