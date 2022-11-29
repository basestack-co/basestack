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
import { ButtonVariant } from "./types";

const sharedButtonStyles = css`
  border: none;
  height: ${rem("36px")};
  display: flex;
  align-items: center;
  padding: 0 ${rem("12px")};
  font-size: ${rem("14px")};
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

const handleButtonVariant = (variant?: ButtonVariant) => {
  switch (variant) {
    default:
    case ButtonVariant.Primary:
      return primaryButtonStyles;
    case ButtonVariant.PrimaryNeutral:
      return primaryNeutralButtonStyles;
    case ButtonVariant.Secondary:
      return secondaryButtonStyles;
    case ButtonVariant.Tertiary:
      return tertiaryButtonStyles;
    case ButtonVariant.Outlined:
      return outlinedButtonStyles;
    case ButtonVariant.Neutral:
      return neutralButtonStyles;
    case ButtonVariant.Danger:
      return dangerButtonStyles;
  }
};

interface Props {
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  fullWidth: boolean;
  variant: ButtonVariant;
}

export const StyledButton = styled.button<Props>`
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

  ${({ hasLeftIcon }) =>
    hasLeftIcon &&
    css`
      padding-left: ${rem("8px")};
    `};

  ${({ hasRightIcon }) =>
    hasRightIcon &&
    css`
      padding-right: ${rem("8px")};
    `};

  &:disabled {
    cursor: not-allowed;
  }
`;
