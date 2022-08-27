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

const sharedStyles = css`
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

const primaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }
`;

const secondaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => lighten(0.2, theme.colors.black)};
  }
`;

const tertiaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:active, :disabled) {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const outlinedStyles = css`
  ${sharedStyles};
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

const neutralStyles = css`
  ${sharedStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const primaryNeutralStyles = css`
  ${sharedStyles};
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

const dangerStyles = css`
  ${sharedStyles};
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
      return primaryStyles;
    case ButtonVariant.PrimaryNeutral:
      return primaryNeutralStyles;
    case ButtonVariant.Secondary:
      return secondaryStyles;
    case ButtonVariant.Tertiary:
      return tertiaryStyles;
    case ButtonVariant.Outlined:
      return outlinedStyles;
    case ButtonVariant.Neutral:
      return neutralStyles;
    case ButtonVariant.Danger:
      return dangerStyles;
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
