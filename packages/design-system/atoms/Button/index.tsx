import { forwardRef } from "react";
import { useTheme } from "styled-components";
import { ButtonProps, ButtonVariant, ButtonSize } from "./types";
import Spinner from "../Spinner";
import Icon from "../Icon";
import {
  SpinnerContainer,
  StyledButton,
  outlinedButtonStyles,
  neutralButtonStyles,
  primaryNeutralButtonStyles,
  dangerButtonStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  tertiaryButtonStyles,
  TextContainer,
} from "./styles";

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
      isLoading = false,
      isDisabled = false,
      size = ButtonSize.Normal,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const hasLeftIcon = !!icon && iconPlacement === "left";
    const hasRightIcon = !!icon && iconPlacement === "right";

    const spinnerColor = {
      [ButtonVariant.Primary]: theme.colors.white,
      [ButtonVariant.Secondary]: theme.colors.white,
      [ButtonVariant.Tertiary]: theme.colors.black,
      [ButtonVariant.PrimaryNeutral]: theme.colors.black,
      [ButtonVariant.Danger]: theme.colors.red400,
      [ButtonVariant.Neutral]: theme.colors.black,
      [ButtonVariant.Outlined]: theme.colors.black,
      [ButtonVariant.DangerFilled]: theme.colors.white,
    };

    const spinnerBg = {
      [ButtonVariant.Primary]: theme.colors.blue500,
      [ButtonVariant.Secondary]: theme.colors.gray500,
      [ButtonVariant.Tertiary]: theme.colors.gray300,
      [ButtonVariant.PrimaryNeutral]: theme.colors.gray200,
      [ButtonVariant.Danger]: theme.colors.gray200,
      [ButtonVariant.Neutral]: theme.colors.gray200,
      [ButtonVariant.Outlined]: theme.colors.gray200,
      [ButtonVariant.DangerFilled]: theme.colors.red200,
    };

    return (
      // @ts-ignore
      <StyledButton
        data-testid="button"
        onClick={onClick}
        ref={ref}
        hasLeftIcon={hasLeftIcon}
        hasRightIcon={hasRightIcon}
        variant={variant}
        fullWidth={fullWidth}
        disabled={isDisabled}
        size={size}
        isLoading={isLoading}
        {...props}
        {...(!!as && { as })}
      >
        <>
          {hasLeftIcon && (
            <Icon icon={icon} size={iconSize} mr={theme.spacing.s2} />
          )}
          <TextContainer isLoading={isLoading}>{children}</TextContainer>
          {hasRightIcon && (
            <Icon icon={icon} size={iconSize} ml={theme.spacing.s2} />
          )}
          {isLoading && (
            <SpinnerContainer>
              <Spinner
                size="small"
                bg={spinnerBg[variant]}
                color={spinnerColor[variant]}
              />
            </SpinnerContainer>
          )}
        </>
      </StyledButton>
    );
  }
);

Button.displayName = "Button";

export {
  outlinedButtonStyles,
  neutralButtonStyles,
  primaryNeutralButtonStyles,
  dangerButtonStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  tertiaryButtonStyles,
  Button,
};
