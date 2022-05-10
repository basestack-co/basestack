import styled, { css } from "styled-components";
import { flexbox, space, position, compose } from "styled-system";
import { rem, darken } from "polished";
import { Variant } from "./types";

const sharedStyles = css`
  ${compose(flexbox, space, position)};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
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
  background-color: ${({ theme }) => theme.colors.gray100};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.gray200};
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
    case "primary":
      return primaryStyles;
    case "primaryNeutral":
      return primaryNeutralStyles;
    case "secondary":
      return secondaryStyles;
    default:
    case "neutral":
      return neutralStyles;
  }
};

export const StyledButton = styled.button<{ variant: Variant }>`
  ${({ variant }) => handleButtonVariant(variant)};
  height: ${rem("36px")};
  width: ${rem("36px")};
`;
