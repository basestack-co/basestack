import React, { memo } from "react";
import { useTheme } from "styled-components";
import { ButtonProps } from "./types";
import Icon from "../Icon";
import { StyledButton } from "./styles";

const Button = ({
  as,
  variant = "primary",
  onClick,
  children,
  icon,
  iconPlacement = "right",
  ...props
}: ButtonProps) => {
  const theme = useTheme();
  const hasLeftIcon = !!icon && iconPlacement === "left";
  const hasRightIcon = !!icon && iconPlacement === "right";

  const customProps =
    as === "a"
      ? {
          as: "a",
        }
      : {
          onClick,
        };

  return (
    <StyledButton
      hasLeftIcon={hasLeftIcon}
      hasRightIcon={hasRightIcon}
      variant={variant}
      {...customProps}
      {...props}
    >
      {hasLeftIcon && <Icon icon={icon} size="medium" mr={theme.spacing.s1} />}
      {children}
      {hasRightIcon && <Icon icon={icon} size="medium" ml={theme.spacing.s1} />}
    </StyledButton>
  );
};

export default memo(Button);
