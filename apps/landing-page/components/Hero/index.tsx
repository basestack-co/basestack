import React from "react";
import { useTheme } from "styled-components";
// Components
import { Button, ButtonVariant } from "@basestack/design-system";
import { ButtonsContainer, Container, ContentContainer } from "./styles";
import SectionHeader from "../SectionHeader";

const Hero = () => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <SectionHeader
          title="Feature Flag Service"
          titleSize="large"
          text="Release features with confidence, manage feature flags across web,
        mobile, and server side applications. Use our hosted API, deploy to your
        own private cloud, or run on-premises"
          hasMarginBottom={false}
        />
        <ButtonsContainer>
          <Button onClick={() => console.log("yeah")}>Get Started</Button>
          <Button
            variant={ButtonVariant.Outlined}
            ml={theme.spacing.s2}
            onClick={() => console.log("yeah")}
          >
            Talk To Sales
          </Button>
        </ButtonsContainer>
      </ContentContainer>
    </Container>
  );
};

export default Hero;
