import React, { memo } from "react";
import { ButtonProps } from "./types";
import { StyledButton } from "./styles";

const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  children,
  ...props
}: ButtonProps) => {
  const customProps =
    type === "link"
      ? {
          as: "a",
        }
      : {
          onClick,
        };

  return (
    <StyledButton variant={variant} {...customProps} {...props}>
      {children}
    </StyledButton>
  );
};

export default memo(Button);
