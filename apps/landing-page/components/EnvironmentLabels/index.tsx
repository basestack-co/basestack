import React, { useEffect, useState } from "react";
// Components
import { Label } from "@basestack/design-system";
import { Container, ContentContainer, Labels } from "./styles";

const EnvironmentLabels = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <Container>
      <ContentContainer>
        <Labels>
          <Label text="Develop" variant="success" />
          <Label text="Stagging" variant="default" />
          <Label text="Production" variant="default" />
        </Labels>

        <Labels>
          <Label text="Develop" variant="success" />
          <Label text="Stagging" variant="success" />
          <Label text="Production" />
        </Labels>

        <Labels>
          <Label text="Develop" variant="success" />
          <Label text="Stagging" variant="success" />
          <Label text="Production" variant="success" />
        </Labels>
      </ContentContainer>
    </Container>
  );
};

export default EnvironmentLabels;
