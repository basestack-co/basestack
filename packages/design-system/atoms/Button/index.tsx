import { forwardRef, memo } from "react";
import { useTheme } from "styled-components";
import { ButtonProps } from "./types";
import Icon from "../Icon";
import { StyledButton } from "./styles";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      variant = "primary",
      onClick,
      children,
      icon,
      iconPlacement = "right",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const hasLeftIcon = !!icon && iconPlacement === "left";
    const hasRightIcon = !!icon && iconPlacement === "right";

    return (
      // @ts-ignore
      <StyledButton
        onClick={onClick}
        ref={ref}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
        {...(!!as && { as })}
      >
        <>
          {hasLeftIcon && (
            <Icon icon={icon} size="medium" mr={theme.spacing.s1} />
          )}
          {children}
          {hasRightIcon && (
            <Icon icon={icon} size="medium" ml={theme.spacing.s1} />
          )}
        </>
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);
