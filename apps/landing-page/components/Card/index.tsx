import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text, IconBox } from "@basestack/design-system";
import { Card } from "../styles";

export interface CardProps {
  title: string;
  text: string;
  icon?: string;
}

const CardComp = ({ title, text, icon = "help" }: CardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();

  const iconBoxProps = isDarkMode
    ? {
        iconColor: colors.gray300,
        outlinedBg: colors.gray800,
        gradient: [
          colors.gray800,
          colors.gray600,
          colors.gray500,
          colors.gray800,
        ],
      }
    : {};

  return (
    <Card>
      <IconBox icon={icon} mb={spacing.s5} {...iconBoxProps} />
      <Text size="large" mb={spacing.s2}>
        {title}
      </Text>
      <Text size="medium" fontWeight={400} lineHeight={1.6} muted>
        {text}
      </Text>
    </Card>
  );
};

export default CardComp;
