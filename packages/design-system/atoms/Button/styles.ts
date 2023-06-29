import styled, { css } from "styled-components";
import {
  color,
  compose,
  flexbox,
  layout,
  space,
  typography,
} from "styled-system";
import { darken, lighten, rem } from "polished";
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
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
`;

export const primaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }
`;

export const secondaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => lighten(0.2, theme.colors.black)};
  }
`;

export const tertiaryButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

export const outlinedButtonStyles = css`
  ${sharedButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => theme.colors.black};

  &:hover:not(:active, :disabled) {
    color: ${({ theme }) => lighten(0.3, theme.colors.black)};
    border-color: ${({ theme }) => lighten(0.3, theme.colors.black)};

    .material-symbols-sharp {
      color: inherit;
    }
  }
`;

export const neutralButtonStyles = css`
  ${sharedButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

export const primaryNeutralButtonStyles = css`
  ${sharedButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.blue400};
    background-color: ${({ theme }) => theme.colors.blue50};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.blue100};
  }
`;

export const dangerButtonStyles = css`
  ${sharedButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.red400};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.red50};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.red100};
  }
`;

export const dangerFilledButtonStyles = css`
  ${sharedButtonStyles};
  background-color: ${({ theme }) => theme.colors.red400};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.red500};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.red400};
  }
`;

const handleButtonVariant = (
  variant: ButtonVariant = ButtonVariant.Primary
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

export const StyledButton = styled.button<StyledButtonProps>`
  ${({ size }) => handleButtonSize(size)};
  ${({ variant }) => handleButtonVariant(variant)};
  ${compose(flexbox, space, layout, typography, color)};

  .material-symbols-sharp {
    color: inherit;
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
    cursor: not-allowed;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      justify-content: center;
    `}
`;

export const TextContainer = styled.span<{ isLoading: boolean }>`
  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0;
    `}
`;

export const SpinnerContainer = styled.div`
  position: absolute;
`;
