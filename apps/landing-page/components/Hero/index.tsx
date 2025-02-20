import React from "react";
// Theme
import { useTheme } from "styled-components";
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
import { useMedia } from "react-use";

interface HeroProps {
  title: string;
  text: string;
  image?: ImageProps;
}

const Hero = ({ title, text, image = { alt: "", src: "" } }: HeroProps) => {
  const { isDarkMode, device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} hasMarginBottom={false} />
        <ButtonsContainer>
          <Button
            justifyContent="center"
            fullWidth={isMobile}
            onClick={() => {
              events.landing.deploy("Deploy to Vercel");
              if (typeof window !== "undefined") {
                window.open(
                  `${config.urls.docs.base}/self-hosting/providers/deploy-vercel`,
                  "_blank",
                );
              }
            }}
            size={ButtonSize.Medium}
          >
            Deploy to Vercel
          </Button>
          <Button
            justifyContent="center"
            fullWidth={isMobile}
            variant={
              isDarkMode ? ButtonVariant.Tertiary : ButtonVariant.Secondary
            }
            size={ButtonSize.Medium}
            onClick={() => {
              events.landing.deploy("Explore more options");
              if (typeof window !== "undefined") {
                window.open(`${config.urls.docs.base}/self-hosting`, "_blank");
              }
            }}
          >
            Explore more options
          </Button>
        </ButtonsContainer>
        {image?.src && (
          <ImageContainer>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...image} />
          </ImageContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Hero;
