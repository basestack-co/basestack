import React from "react";
import { transparentize } from "polished";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import { IconContainer } from "./styles";

export type IconBoxColor = "blue" | "purple" | "gray" | "green";

export interface IconBoxProps {
  icon: string;
  color: IconBoxColor;
}

const IconBox = ({ icon, color }: IconBoxProps) => {
  const { colors, isDarkMode } = useTheme();

  const lightStyles = {
    green: {
      iconColor: colors.green500,
      backgroundColor: colors.green50,
    },
    blue: {
      iconColor: colors.blue500,
      backgroundColor: colors.blue50,
    },
    purple: {
      iconColor: colors.purple500,
      backgroundColor: colors.purple50,
    },
    gray: {
      iconColor: colors.gray500,
      backgroundColor: colors.gray50,
    },
  };

  const darkStyles = {
    green: {
      iconColor: colors.green200,
      backgroundColor: transparentize(0.8, colors.green200),
    },
    blue: {
      iconColor: colors.blue200,
      backgroundColor: transparentize(0.8, colors.blue200),
    },
    purple: {
      iconColor: colors.purple200,
      backgroundColor: transparentize(0.8, colors.purple200),
    },
    gray: {
      iconColor: colors.gray200,
      backgroundColor: transparentize(0.8, colors.gray200),
    },
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <IconContainer bg={styles[color].backgroundColor}>
      <Icon icon={icon} color={styles[color].iconColor} />
    </IconContainer>
  );
};

export default IconBox;
