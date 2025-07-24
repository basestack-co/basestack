import { transparentize } from "polished";
import React from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import { ContentContainer, IconContainer } from "./styles";
import { IconBoxColor, IconBoxProps, IconBoxVariant } from "./types";

const IconBox = ({
  icon,
  color = "gray",
  variant = "outlined",
  backgroundColor,
  iconColor,
  gradient,
  size = "large",
  ...props
}: IconBoxProps) => {
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
      iconColor: colors.gray300,
      backgroundColor: transparentize(0.8, colors.gray200),
    },
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  const iconColorVariant =
    styles[variant === "outlined" ? "gray" : color].iconColor;

  return (
    <IconContainer
      className="icon-box"
      variant={variant}
      filledBg={styles[color].backgroundColor}
      outlinedBg={backgroundColor}
      gradient={gradient}
      size={size}
      {...props}
    >
      <ContentContainer>
        <Icon
          icon={icon}
          color={iconColor || iconColorVariant}
          size={size === "small" ? "small" : "medium"}
        />
      </ContentContainer>
    </IconContainer>
  );
};

export type { IconBoxProps, IconBoxColor, IconBoxVariant };
export default IconBox;
