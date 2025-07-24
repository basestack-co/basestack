import { Text } from "@basestack/design-system";
import React from "react";
import { useTheme } from "styled-components";
import { Card } from "../../styles";
import {
  CardContainer,
  ComponentContainer,
  Image,
  ImageContainer,
} from "./styles";

export interface CardProps {
  title: string;
  text: string;
  component?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
}

const CardComp = ({ title, text, image, component }: CardProps) => {
  const { spacing } = useTheme();

  return (
    <CardContainer>
      <Card>
        <Text size="large" mb={spacing.s2}>
          {title}
        </Text>
        <Text size="medium" fontWeight={400} muted>
          {text}
        </Text>
        {component ? (
          <ComponentContainer>{component}</ComponentContainer>
        ) : (
          <ImageContainer>
            {image && <Image src={image.src} alt={title} />}
          </ImageContainer>
        )}
      </Card>
    </CardContainer>
  );
};

export default CardComp;
