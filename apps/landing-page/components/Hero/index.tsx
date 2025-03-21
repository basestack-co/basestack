import React from "react";
import { useTheme } from "styled-components";
import { events } from "@basestack/utils";
import Image, { ImageProps } from "../Image";
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  StyledImageContainer,
} from "./styles";
import SectionHeader, { SectionHeaderProps } from "../SectionHeader";
import { useMedia } from "react-use";

interface HeroProps {
  header: Omit<SectionHeaderProps, "hasMarginBottom">;
  image?: ImageProps;
  actions?: Array<{
    id: string;
    text: string;
    href: string;
    isTertiary?: boolean;
  }>;
}

const Hero = ({ header, image = { alt: "", src: "" }, actions }: HeroProps) => {
  const { isDarkMode, device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader {...header} hasMarginBottom={false} />
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
          <StyledImageContainer>
            <Image alt={image.alt} src={image.src} />
          </StyledImageContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default Hero;
