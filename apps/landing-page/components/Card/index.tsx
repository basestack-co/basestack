import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text, IconBox } from "@basestack/design-system";
import { Container } from "./styles";

export interface CardProps {
  title: string;
  text: string;
  isDarkMode?: boolean;
  icon?: string;
}

const Card = ({
  title,
  text,
  isDarkMode = false,
  icon = "help",
}: CardProps) => {
  const { colors, spacing } = useTheme();

  const iconBoxProps = isDarkMode
    ? {
        iconColor: colors.gray300,
        outlinedBg: colors.gray700,
        gradient: [
          colors.gray700,
          colors.gray600,
          colors.gray500,
          colors.gray700,
        ],
      }
    : {};

  return (
    <Container isDarkMode={isDarkMode}>
      <IconBox icon={icon} mb={spacing.s5} {...iconBoxProps} />
      <Text
        size="xLarge"
        mb={spacing.s2}
        color={isDarkMode ? colors.gray50 : colors.black}
      >
        {title}
      </Text>
      <Text
        size="medium"
        fontWeight={400}
        lineHeight={1.6}
        color={isDarkMode ? colors.gray300 : colors.gray500}
      >
        {text}
      </Text>
    </Container>
  );
};

export default Card;
