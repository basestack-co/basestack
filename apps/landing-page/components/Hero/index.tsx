import React from "react";
// Theme
import { useTheme } from "styled-components";
import { rem } from "polished";
// Utils
import { config, events } from "@basestack/utils";
// Components
import Image, { ImageProps } from "../Image";
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  ImageContainer,
} from "./styles";
import SectionHeader from "../SectionHeader";
import { deploy } from "@basestack/utils/src/events/landing";

interface HeroProps {
  title: string;
  text: string;
  image?: ImageProps;
}

const Hero = ({ title, text, image = { alt: "", src: "" } }: HeroProps) => {
  const theme = useTheme();

  return (
    <Container>
      <ContentContainer>
        <SectionHeader
          title={title}
          titleSize="large"
          text={text}
          hasMarginBottom={false}
        />
        <ButtonsContainer>
          <Button
            onClick={() => {
              events.landing.deploy("Deploy to Vercel");
              if (typeof window !== "undefined") {
                window.open(
                  `${config.urls.docs.base}/feature-flags/deployment/deploy-vercel`,
                  "_blank",
                );
              }
            }}
            size={ButtonSize.Medium}
          >
            Deploy to Vercel
          </Button>
          <Button
            variant={ButtonVariant.Secondary}
            ml={theme.spacing.s3}
            size={ButtonSize.Medium}
            onClick={() => {
              events.landing.deploy("Explore more options");
              if (typeof window !== "undefined") {
                window.open(
                  `${config.urls.docs.base}/feature-flags/deployment`,
                  "_blank",
                );
              }
            }}
          >
            Explore more options
          </Button>
        </ButtonsContainer>
        {image?.src && (
          <ImageContainer>
            <Image mt={rem("100px")} {...image} />
          </ImageContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Hero;
