import React, { useState } from "react";
import { useTheme } from "styled-components";
// Components
import {
  CardContainer,
  CardsContainer,
  Container,
  ContentContainer,
  TitleContainer,
} from "./styles";
import Image from "../Image";
import SectionHeader from "../SectionHeader";
import { Icon, Text } from "@basestack/design-system";

export interface SliderProps {
  title: string;
  text: string;
  data: Array<{
    icon: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
  }>;
}

interface CardProps {
  text: string;
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const Card = ({ title, text, icon, isActive = false, onClick }: CardProps) => {
  const theme = useTheme();

  return (
    <CardContainer onClick={onClick} isActive={isActive}>
      <TitleContainer>
        <Icon
          icon={icon}
          size="medium"
          color={isActive ? theme.colors.primary : theme.colors.black}
        />
        <Text ml={theme.spacing.s3} size="medium">
          {title}
        </Text>
      </TitleContainer>
      <Text muted>{text}</Text>
    </CardContainer>
  );
};

const Slider = ({ title, text, data }: SliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const image = {
    src: data[activeSlide].image.src,
    alt: data[activeSlide].image.alt,
  };

  return (
    <Container>
      <ContentContainer>
        <SectionHeader title={title} text={text} />
        <CardsContainer>
          {data?.map((item, index) => (
            <Card
              key={index}
              isActive={index === activeSlide}
              icon={item.icon}
              title={item.title}
              text={item.text}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </CardsContainer>
        <Image src={image.src} alt={image.alt} />
      </ContentContainer>
    </Container>
  );
};

export default Slider;
