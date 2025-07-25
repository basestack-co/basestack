import { Fragment } from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import Spinner from "../Spinner";
import {
  dangerButtonStyles,
  neutralButtonStyles,
  outlinedButtonStyles,
  primaryButtonStyles,
  primaryNeutralButtonStyles,
  SpinnerContainer,
  StyledButton,
  secondaryButtonStyles,
  TextContainer,
  tertiaryButtonStyles,
} from "./styles";
import { type ButtonProps, ButtonSize, ButtonVariant } from "./types";

const Button = ({
  ref,
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
  type,
  leftElement,
  ...props
}: ButtonProps) => {
  const theme = useTheme();
  const hasLeftIcon = !!icon && iconPlacement === "left";
  const hasRightIcon = !!icon && iconPlacement === "right";

  const spinnerBg = {
    [ButtonVariant.Primary]: theme.button.primary.spinner.backgroundColor,
    [ButtonVariant.Secondary]: theme.button.secondary.spinner.backgroundColor,
    [ButtonVariant.Tertiary]: theme.button.tertiary.spinner.backgroundColor,
    [ButtonVariant.PrimaryNeutral]:
      theme.button.primaryNeutral.spinner.backgroundColor,
    [ButtonVariant.Danger]: theme.button.danger.spinner.backgroundColor,
    [ButtonVariant.Neutral]: theme.button.neutral.spinner.backgroundColor,
    [ButtonVariant.Outlined]: theme.button.outlined.spinner.backgroundColor,
    [ButtonVariant.DangerFilled]:
      theme.button.dangerFilled.spinner.backgroundColor,
  };

  const spinnerColor = {
    [ButtonVariant.Primary]: theme.button.primary.spinner.color,
    [ButtonVariant.Secondary]: theme.button.secondary.spinner.color,
    [ButtonVariant.Tertiary]: theme.button.tertiary.spinner.color,
    [ButtonVariant.PrimaryNeutral]: theme.button.primaryNeutral.spinner.color,
    [ButtonVariant.Danger]: theme.button.danger.spinner.color,
    [ButtonVariant.Neutral]: theme.button.neutral.spinner.color,
    [ButtonVariant.Outlined]: theme.button.outlined.spinner.color,
    [ButtonVariant.DangerFilled]: theme.button.dangerFilled.spinner.color,
  };

  const iconProps = {
    icon: icon as string,
    size: iconSize,
    color: theme.button[variant].color,
  };

  return (
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
      type={type}
      {...props}
      {...(!!as && { as })}
    >
      {leftElement && <Fragment>{leftElement}</Fragment>}
      {hasLeftIcon && <Icon mr={theme.spacing.s2} {...iconProps} />}
      <TextContainer isLoading={isLoading}>{children}</TextContainer>
      {hasRightIcon && <Icon ml={theme.spacing.s2} {...iconProps} />}
      {isLoading && (
        <SpinnerContainer>
          <Spinner
            size="small"
            bg={spinnerBg[variant]}
            color={spinnerColor[variant]}
          />
        </SpinnerContainer>
      )}
    </StyledButton>
  );
};

Button.displayName = "Button";

export {
  outlinedButtonStyles,
  neutralButtonStyles,
  primaryNeutralButtonStyles,
  dangerButtonStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
  tertiaryButtonStyles,
  type ButtonProps,
  ButtonVariant,
  ButtonSize,
  Button,
};
