import React from "react";
// Theme
import { useTheme } from "styled-components";
// Utils
import { events } from "@basestack/utils";
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
  actions?: Array<{
    id: string;
    text: string;
    href: string;
    isTertiary?: boolean;
  }>;
}

const Hero = ({
  title,
  text,
  image = { alt: "", src: "" },
  actions,
}: HeroProps) => {
  const { isDarkMode, device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} hasMarginBottom={false} />
        <ButtonsContainer>
          {actions?.map(({ id, text, href, isTertiary }) => {
            return (
              <Button
                key={id}
                justifyContent="center"
                fullWidth={isMobile}
                onClick={() => {
                  events.landing.deploy(`Click on ${text}`);
                  if (typeof window !== "undefined") {
                    window.open(href, "_blank");
                  }
                }}
                size={ButtonSize.Medium}
                {...(isTertiary
                  ? {
                      variant: isDarkMode
                        ? ButtonVariant.Tertiary
                        : ButtonVariant.Secondary,
                    }
                  : {})}
              >
                {text}
              </Button>
            );
          })}
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
