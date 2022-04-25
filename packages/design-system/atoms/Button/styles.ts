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
  }
`;

const neutralStyles = css`
  ${sharedStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};

  &:hover:not(:active) {
    color: ${({ theme }) => lighten(0.3, theme.colors.black)};
  }
`;

const handleButtonVariant = (variant?: Variant) => {
  switch (variant) {
    default:
    case "primary":
      return primaryStyles;
    case "secondary":
      return secondaryStyles;
    case "tertiary":
      return tertiaryStyles;
    case "neutral":
      return neutralStyles;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  ${({ variant }) => handleButtonVariant(variant)};
`;
