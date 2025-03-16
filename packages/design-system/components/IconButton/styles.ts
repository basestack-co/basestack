import styled, { css } from "styled-components";
import { flexbox, space, position, compose } from "styled-system";
import { rem } from "polished";
import { Variant } from "./types";

const sharedStyles = css`
  ${compose(flexbox, space, position)};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition:
    background-color 0.1s ease-in-out,
    color 0.1s ease-in-out,
    border-color 0.1s ease-in-out;
`;

const primaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.iconButton.primary.backgroundColor};
  color: ${({ theme }) => theme.iconButton.primary.color};

  &:hover:not(:active) {
    background-color: ${({ theme }) =>
      theme.iconButton.primary.hover.backgroundColor};
  }
`;

const secondaryStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) =>
    theme.iconButton.secondary.backgroundColor};
  color: ${({ theme }) => theme.iconButton.secondary.color};

  &:hover:not(:active) {
    background-color: ${({ theme }) =>
      theme.iconButton.secondary.hover.backgroundColor};
  }
`;

const secondaryDarkStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) =>
    theme.iconButton.secondaryDark.backgroundColor};
  color: ${({ theme }) => theme.iconButton.secondaryDark.color};

  &:hover:not(:active) {
    background-color: ${({ theme }) =>
      theme.iconButton.secondaryDark.hover.backgroundColor};
  }
`;

const neutralStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) => theme.iconButton.neutral.backgroundColor};
  color: ${({ theme }) => theme.iconButton.neutral.color};

  .material-symbols-sharp,
  .material-symbols-rounded {
    color: inherit;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.iconButton.neutral.hover.backgroundColor};
  }

  &:active {
    background-color: ${({ theme }) =>
      theme.iconButton.neutral.active.backgroundColor};
  }
`;

const primaryNeutralStyles = css`
  ${sharedStyles};
  background-color: ${({ theme }) =>
    theme.iconButton.primaryNeutral.backgroundColor};
  color: ${({ theme }) => theme.iconButton.primaryNeutral.color};

  .material-symbols-sharp,
  .material-symbols-rounded {
    color: inherit;
  }

  &:hover {
    color: ${({ theme }) => theme.iconButton.primaryNeutral.hover.color};
    background-color: ${({ theme }) =>
      theme.iconButton.primaryNeutral.hover.backgroundColor};
  }

  &:active {
    background-color: ${({ theme }) =>
      theme.iconButton.primaryNeutral.active.backgroundColor};
  }
`;

const handleButtonVariant = (variant?: Variant) => {
  switch (variant) {
    case "primary":
      return primaryStyles;
    case "primaryNeutral":
      return primaryNeutralStyles;
    case "secondary":
      return secondaryStyles;
    case "secondaryDark":
      return secondaryDarkStyles;
    default:
    case "neutral":
      return neutralStyles;
  }
};

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["iconSize", "zIndex", "flexShrink"].includes(prop),
})<{
  variant: Variant;
  iconSize: string;
}>`
  ${({ variant }) => handleButtonVariant(variant)};
  height: ${({ iconSize }) => rem(iconSize)};
  width: ${({ iconSize }) => rem(iconSize)};
`;
