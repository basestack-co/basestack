import styled, { css } from "styled-components";
import { compose, flexbox, space } from "styled-system";
import { ButtonProps } from "./types";
import {
  handleButtonSize,
  handleButtonsColors,
  darkenColors,
  lightenColors,
} from "./utils";

export const Button = styled.button<ButtonProps>`
  ${compose(space, flexbox)};
  ${({ size }) => handleButtonSize(size)};
  border-radius: ${({ theme }) => theme.values.borderRadius.medium};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
  text-transform: ${({ textTransform }) => textTransform || null};

  ${({ fullWidth }) =>
    fullWidth
      ? css`
          display: flex;
          flex-grow: 1;
        `
      : css`
          display: inline-flex;
          width: fit-content;
        `}

  ${({ variant, type, theme }) =>
    variant === "outline"
      ? css`
          background-color: transparent;
          border: 1px solid
            ${handleButtonsColors(theme)[type || "primary"].outline.borderColor};
          color: ${handleButtonsColors(theme)[type || "primary"].outline.color};

          &:hover {
            color: ${darkenColors(theme, 0.1, type!, variant, "color")};
            border-color: ${darkenColors(
              theme,
              0.1,
              type!,
              variant,
              "borderColor"
            )};
          }

          &:active {
            color: ${darkenColors(theme, 0.2, type!, variant, "color")};
            border-color: ${darkenColors(
              theme,
              0.2,
              type!,
              variant,
              "borderColor"
            )};
          }

          &:disabled {
            cursor: not-allowed;
            color: ${lightenColors(theme, 0.4, type!, variant!, "color")};
            border-color: ${lightenColors(
              theme,
              0.4,
              type!,
              variant!,
              "borderColor"
            )};
          }
        `
      : css`
          border: none;
          background-color: ${handleButtonsColors(theme)[type || "primary"]
            .filled.backgroundColor};
          color: ${handleButtonsColors(theme)[type || "primary"].filled.color};

          &:hover {
            background-color: ${darkenColors(
              theme,
              0.1,
              type!,
              variant!,
              "backgroundColor"
            )};
          }

          &:active {
            background-color: ${darkenColors(
              theme,
              0.2,
              type!,
              variant!,
              "backgroundColor"
            )};
          }

          &:disabled {
            cursor: not-allowed;
            background-color: ${lightenColors(
              theme,
              0.4,
              type!,
              variant!,
              "backgroundColor"
            )};
            ${(type === "neutral" || type === "tertiary") &&
            css`
              color: ${lightenColors(theme, 0.4, type!, variant!, "color")};
            `}
          }
        `}
  
   ${({ hasRightIcon }) =>
    hasRightIcon &&
    css`
      & > svg {
        flex-shrink: 0;
        margin-left: 12px;
      }
    `}
   
   ${({ hasLeftIcon }) =>
    hasLeftIcon &&
    css`
      & > svg {
        flex-shrink: 0;
        margin-right: 12px;
      }
    `}
`;
