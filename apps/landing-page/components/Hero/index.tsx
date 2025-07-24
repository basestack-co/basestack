import { Button, ButtonSize, ButtonVariant } from "@basestack/design-system";
import { useRouter } from "next/navigation";
import React from "react";
import Image, { ImageProps } from "../Image";
import SectionHeader, { SectionHeaderProps } from "../SectionHeader";
import {
  ButtonsContainer,
  Container,
  ContentContainer,
  StyledImageContainer,
} from "./styles";

interface HeroProps {
  header: Omit<SectionHeaderProps, "hasMarginBottom">;
  image?: ImageProps;
  actions?: Array<{
    id: string;
    text: string;
    href: string;
    variant?: ButtonVariant;
    isExternal?: boolean;
    icon?: string;
  }>;
}

const Hero = ({ header, image = { alt: "", src: "" }, actions }: HeroProps) => {
  const router = useRouter();
  return (
    <Container>
      <ContentContainer>
        <SectionHeader {...header} hasMarginBottom={false} />
        <ButtonsContainer>
          {actions?.map((item) => {
            return (
              <Button
                key={item.id}
                justifyContent="center"
                onClick={() => {
                  if (item.isExternal) {
                    window?.open(item.href, "_blank");
                  } else {
                    router.push(item.href);
                  }
                }}
                size={ButtonSize.Medium}
                variant={item.variant || ButtonVariant.Primary}
                icon={item.icon}
                iconPlacement="left"
              >
                {item.text}
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
