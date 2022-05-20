import React from "react";
import { ButtonProps } from "./types";
import { Button as StyledButton } from "./styles";

const Button: React.FC<ButtonProps> = ({
  variant = "filled",
  size = "normal",
  // @ts-ignore
  children,
  disabled = false,
  as = "button",
  href,
  fullWidth = false,
  onClick,
  type = "primary",
  hasRightIcon = false,
  hasLeftIcon = false,
  textTransform,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      as={as}
      href={href}
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      hasRightIcon={hasRightIcon}
      hasLeftIcon={hasLeftIcon}
      textTransform={textTransform}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
