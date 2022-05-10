import React, { memo } from "react";
import { useTheme } from "styled-components";
import { IconButtonProps } from "./types";
import Icon from "../Icon";
import { StyledButton } from "./styles";

const IconButton = ({
  variant = "neutral",
  onClick,
  icon,
  ...props
}: IconButtonProps) => {
  const theme = useTheme();

  const handleIconColor = () => {
    switch (variant) {
      case "primary":
        return theme.colors.white;
      case "primaryNeutral":
        return theme.colors.blue400;
      case "secondary":
        return theme.colors.black;
      default:
      case "neutral":
        return theme.colors.black;
    }
  };

  const iconColor = handleIconColor();

  return (
    <StyledButton onClick={onClick} variant={variant} {...props}>
      <Icon icon={icon} size="medium" color={iconColor} />
    </StyledButton>
  );
};

export default memo(IconButton);
