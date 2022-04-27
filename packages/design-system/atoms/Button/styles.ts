import styled, { css } from "styled-components";
import { flexbox, space, compose } from "styled-system";
import { rem, darken, lighten } from "polished";
import { ButtonProps, Variant } from "./types";

const sharedStyles = css`
  ${compose(flexbox, space)};
  border: none;
  height: ${rem("36px")};
  width: fit-content;
  display: flex;
  align-items: center;
  padding: 0 ${rem("12px")};
  font-size: ${rem("14px")};
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out, color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
`;

const primaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active) {
    background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
  }
`;

const secondaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active) {
    background-color: ${({ theme }) => lighten(0.2, theme.colors.black)};
  }
`;

const tertiaryStyles = css`
  ${sharedStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => theme.colors.black};

  &:hover:not(:active) {
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

  .material-symbols-sharp {
    color: inherit;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

const primaryNeutralStyles = css`
  ${sharedStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};

  .material-symbols-sharp {
    color: inherit;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.blue400};
    background-color: ${({ theme }) => theme.colors.blue50};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.blue100};
  }
`;

const handleButtonVariant = (variant?: Variant) => {
  switch (variant) {
    default:
    case "primary":
      return primaryStyles;
    case "primaryNeutral":
      return primaryNeutralStyles;
    case "secondary":
      return secondaryStyles;
    case "tertiary":
      return tertiaryStyles;
    case "neutral":
      return neutralStyles;
  }
};

interface Props extends ButtonProps {
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

export const StyledButton = styled.button<Props>`
  ${({ variant }) => handleButtonVariant(variant)};

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
`;
