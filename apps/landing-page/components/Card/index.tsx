import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text } from "@basestack/design-system";
import Illustration, { IllustrationProps } from "../Illustration";
import { Container, ImageContainer } from "./styles";

export interface CardProps {
  illustration: IllustrationProps;
  title: string;
  text: string;
  isDarkMode?: boolean;
}

const Card = ({ illustration, title, text, isDarkMode = false }: CardProps) => {
  const theme = useTheme();

  return (
    <Container isDarkMode={isDarkMode}>
      <ImageContainer>
        <Illustration {...illustration} />
      </ImageContainer>
      <Text
        size="xLarge"
        mb={theme.spacing.s2}
        mt={theme.spacing.s5}
        color={isDarkMode ? theme.colors.gray50 : theme.colors.black}
      >
        {title}
      </Text>
      <Text
        size="medium"
        fontWeight={400}
        lineHeight={1.6}
        color={isDarkMode ? theme.colors.gray300 : theme.colors.gray500}
      >
        {text}
      </Text>
    </Container>
  );
};

export default Card;
