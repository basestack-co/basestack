import React from "react";
// Utils
import { config as defaults, config } from "@basestack/utils";
// Components
import { useTheme } from "styled-components";
import { rem } from "polished";
import { Button, ButtonSize, Text } from "@basestack/design-system";
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

export interface Props {
  id?: string;
}
const BannerComp = ({ id = "banner" }: Props) => {
  const theme = useTheme();

  return (
    <Container id={id}>
      <ContentContainer>
        <Banner>
          <BannerContent>
            <Text
              size="xxLarge"
              fontSize={rem("42px")}
              lineHeight="1.3"
              color={theme.colors.gray50}
              mb={theme.spacing.s2}
              fontFamily="robotoFlex"
              // @ts-ignore
              as="h2"
            >
              Ready to Ship Your Code with Confidence?
            </Text>
            <ButtonsContainer>
              <StyledButton
                mr={theme.spacing.s3}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(config.urls.docs.flags.base, "_blank");
                  }
                }}
                size={ButtonSize.Medium}
              >
                Get Started
              </StyledButton>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open(defaults.urls.repo, "_blank");
                  }
                }}
                size={ButtonSize.Medium}
              >
                Star Us on GitHub
              </Button>
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
