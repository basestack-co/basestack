import React from "react";
import { useTheme } from "styled-components";
// Components
import { Button, Text } from "@basestack/design-system";
import Illustration, { IllustrationVariant } from "../Illustration";
import {
  Container,
  ContentContainer,
  Banner,
  BannerContent,
  ButtonsContainer,
  StyledButton,
  PlanetIllustration,
  HalfPlanetIllustration,
} from "./styles";
import { rem } from "polished";

const BannerComp = () => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <Banner>
          <BannerContent>
            <Text
              size="xxLarge"
              fontSize={rem("42px")}
              lineHeight="1.4"
              color={theme.colors.gray50}
              mb={theme.spacing.s2}
              // @ts-ignore
              as="h2"
            >
              Ready to start shipping your code with confidence?
            </Text>
            <ButtonsContainer>
              <StyledButton
                mr={theme.spacing.s2}
                onClick={() => console.log("yeah")}
              >
                Get Started
              </StyledButton>
              <Button onClick={() => console.log("yeah")}>Talk To Sales</Button>
            </ButtonsContainer>
          </BannerContent>
          <PlanetIllustration>
            <Illustration
              width={320}
              color={theme.colors.white}
              variant={IllustrationVariant.Planet}
            />
          </PlanetIllustration>
          <HalfPlanetIllustration>
            <Illustration
              width={496}
              color={theme.colors.white}
              variant={IllustrationVariant.HalfPlanet}
            />
          </HalfPlanetIllustration>
        </Banner>
      </ContentContainer>
    </Container>
  );
};

export default BannerComp;
