import React from "react";
import { useTheme } from "styled-components";
import { Text, Icon } from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  Image,
  ImageContainer,
  ImagePlaceholder,
  NumberContainer,
  TextContainer,
  NumberCircle,
} from "./styles";

export interface CardProps {
  title: string;
  text: string;
  number: number;
  image: { src: string; alt: string };
  isFirst?: boolean;
  isLast?: boolean;
}

const CardComp = ({
  title,
  text,
  number = 1,
  image,
  isFirst = false,
  isLast = false,
}: CardProps) => {
  const { spacing } = useTheme();

  return (
    <Container>
      <ContentContainer>
        <NumberContainer isFirst={isFirst} isLast={isLast}>
          <NumberCircle>
            <Text size="medium" fontWeight={400}>
              {number}
            </Text>
          </NumberCircle>
        </NumberContainer>

        <TextContainer>
          <Text size="xLarge" mb={spacing.s1}>
            {title}
          </Text>
          <Text size="medium" fontWeight={400} lineHeight={1.6} muted>
            {text}
          </Text>
        </TextContainer>
      </ContentContainer>

      <ImageContainer>
        {!!image.src ? (
          <Image src={image.src} alt={image.alt} />
        ) : (
          <ImagePlaceholder>
            <Icon icon="image" muted />
          </ImagePlaceholder>
        )}
      </ImageContainer>
    </Container>
  );
};

export default CardComp;
