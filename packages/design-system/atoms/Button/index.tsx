import { forwardRef, memo } from "react";
import { useTheme } from "styled-components";
import { ButtonProps, ButtonVariant } from "./types";
import Icon from "../Icon";
import { StyledButton } from "./styles";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      variant = ButtonVariant.Primary,
      onClick,
      children,
      icon,
      iconPlacement = "right",
      fullWidth = false,
      iconSize = "medium",
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
            <Icon icon={icon} size={iconSize} mr={theme.spacing.s2} />
          )}
          {children}
          {hasRightIcon && (
            <Icon icon={icon} size={iconSize} ml={theme.spacing.s2} />
          )}
        </>
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);
