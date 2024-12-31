import styled, { css } from "styled-components";
import {
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from "styled-system";
import { rem } from "polished";
import { ButtonSize, ButtonVariant, StyledButtonProps } from "./types";

const sharedButtonStyles = css`
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
`;

export const primaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.primary.backgroundColor};
  color: ${({ theme }) => theme.button.primary.color};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) =>
      theme.button.primary.hover.backgroundColor};
  }
`;

export const secondaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.secondary.backgroundColor};
  color: ${({ theme }) => theme.button.secondary.color};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) =>
      theme.button.secondary.hover.backgroundColor};
  }
`;

export const tertiaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.tertiary.backgroundColor};
  color: ${({ theme }) => theme.button.tertiary.color};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) =>
      theme.button.tertiary.hover.backgroundColor};
  }
`;

export const outlinedButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.outlined.backgroundColor};
  color: ${({ theme }) => theme.button.outlined.color};
  border: 1px solid ${({ theme }) => theme.button.outlined.border};

  &:hover:not(:active, :disabled) {
    color: ${({ theme }) => theme.button.outlined.hover.color};
    border-color: ${({ theme }) => theme.button.outlined.hover.border};

    .material-symbols-sharp,
    .material-symbols-rounded {
      color: inherit;
    }
  }
`;

export const neutralButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.neutral.backgroundColor};
  color: ${({ theme }) => theme.button.neutral.color};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.neutral.hover.backgroundColor};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.neutral.active.backgroundColor};
  }
`;

export const primaryNeutralButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) =>
    theme.button.primaryNeutral.backgroundColor};
  color: ${({ theme }) => theme.button.primaryNeutral.color};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.button.primaryNeutral.hover.color};
    background-color: ${({ theme }) =>
      theme.button.primaryNeutral.hover.backgroundColor};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.primaryNeutral.active.backgroundColor};
  }
`;

export const dangerButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.danger.backgroundColor};
  color: ${({ theme }) => theme.button.danger.color};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.button.danger.hover.color};
    background-color: ${({ theme }) =>
      theme.button.danger.hover.backgroundColor};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.danger.active.backgroundColor};
  }
`;

export const dangerFilledButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.button.dangerFilled.backgroundColor};
  color: ${({ theme }) => theme.button.dangerFilled.color};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.dangerFilled.hover.backgroundColor};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.button.dangerFilled.active.backgroundColor};
  }
`;

const handleButtonVariant = (
  variant: ButtonVariant = ButtonVariant.Primary,
) => {
  const buttonVariant = {
    [ButtonVariant.Primary]: primaryButtonStyles,
    [ButtonVariant.PrimaryNeutral]: primaryNeutralButtonStyles,
    [ButtonVariant.Secondary]: secondaryButtonStyles,
    [ButtonVariant.Tertiary]: tertiaryButtonStyles,
    [ButtonVariant.Outlined]: outlinedButtonStyles,
    [ButtonVariant.Neutral]: neutralButtonStyles,
    [ButtonVariant.Danger]: dangerButtonStyles,
    [ButtonVariant.DangerFilled]: dangerFilledButtonStyles,
  };

  return buttonVariant[variant];
};

const handleButtonSize = (size?: ButtonSize) => {
  switch (size) {
    default:
    case ButtonSize.Normal:
      return {
        height: rem("36px"),
        padding: `0 ${rem("12px")}`,
        fontSize: rem("14px"),
      };
    case ButtonSize.Medium:
      return {
        height: rem("42px"),
        padding: `0 ${rem("16px")}`,
        fontSize: rem("16px"),
      };
  }
};

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "isLoading",
      "justifyContent",
      "fullWidth",
      "hasRightIcon",
      "hasLeftIcon",
      "flexShrink",
      "backgroundColor",
    ].includes(prop),
})<StyledButtonProps>`
  ${({ size }) => handleButtonSize(size)};
  ${({ variant }) => handleButtonVariant(variant)};
  ${compose(flexbox, space, layout, typography, color)};

  .material-symbols-sharp,
  .material-symbols-rounded {
    color: inherit;
  }

  svg,
  svg g {
    fill: ${({ theme, variant }) => theme.button[variant].color};
  }

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          width: 100%;
        `
      : css`
          width: fit-content;
        `};

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      .material-symbols-sharp,
      .material-symbols-rounded {
        opacity: 0;
      }
    `}
`;

export const TextContainer = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>`
  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0;
    `}
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
