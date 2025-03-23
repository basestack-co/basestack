import React from "react";
import { useRouter } from "next/navigation";
// Components
import Image, { ImageProps } from "../Image";
import { Button, ButtonVariant, ButtonSize } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  StyledImageContainer,
} from "./styles";
import SectionHeader, { SectionHeaderProps } from "../SectionHeader";
// Hooks
import { useMedia } from "react-use";

interface HeroProps {
  header: Omit<SectionHeaderProps, "hasMarginBottom">;
  image?: ImageProps;
  actions?: Array<{
    id: string;
    text: string;
    href: string;
    isTertiary?: boolean;
    isExternal?: boolean;
  }>;
}

const Hero = ({ header, image = { alt: "", src: "" }, actions }: HeroProps) => {
  const router = useRouter();
  const { isDarkMode, device } = useTheme();
  const isMobile = useMedia(device.max.sm, false);

  return (
    <Container>
      <ContentContainer>
        <SectionHeader {...header} hasMarginBottom={false} />
        <ButtonsContainer>
          {actions?.map(({ id, text, href, isTertiary, isExternal }) => {
            return (
              <Button
                key={id}
                justifyContent="center"
                fullWidth={isMobile}
                onClick={() => {
                  if (isExternal) {
                    window?.open(href, "_blank");
                  } else {
                    router.push(href);
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
