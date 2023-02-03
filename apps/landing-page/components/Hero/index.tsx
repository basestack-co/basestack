import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
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
          <Button onClick={() => console.log("yeah")} size={ButtonSize.Medium}>
            Get Started
          </Button>
          <Button
            variant={ButtonVariant.Outlined}
            ml={theme.spacing.s3}
            onClick={() => console.log("yeah")}
            size={ButtonSize.Medium}
          >
            Talk To Sales
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
