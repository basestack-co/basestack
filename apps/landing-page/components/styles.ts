import styled, { css } from "styled-components";
import { rem } from "polished";

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => !["p", "bg", "transitionBg"].includes(prop),
})<{
  p?: string | number;
  bg?: string;
  transitionBg?: boolean;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  background-color: ${({ theme, bg }) =>
    bg ? bg : theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
  border-radius: ${rem("8px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation3};
  padding: ${({ p, theme }) =>
    p !== undefined && p !== null
      ? typeof p === "number"
        ? `${p}px`
        : p
      : theme.spacing.s5};

  ${({ transitionBg }) =>
    transitionBg &&
    css`
      transition: background-color 0.2s ease-in-out;
    `};
`;

export const Label = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
  padding: 0 ${({ theme }) => theme.spacing.s2};
  height: ${rem("28px")};
  border-radius: ${rem("4px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
`;

export const gradientBorderStyles = (position: "top" | "bottom") => css`
  &::before {
    content: "";
    position: absolute;
    top: ${position === "top" ? 0 : "initial"};
    bottom: ${position === "bottom" ? 0 : "initial"};
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray200};
    ${({ theme }) =>
      theme.isDarkMode
        ? css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray900} 0%,
              ${theme.colors.gray700} 25%,
              ${theme.colors.gray700} 50%,
              ${theme.colors.gray700} 75%,
              ${theme.colors.gray900} 100%
            );
          `
        : css`
            background-image: linear-gradient(
              to right,
              ${theme.colors.gray50} 0%,
              ${theme.colors.gray200} 25%,
              ${theme.colors.gray200} 50%,
              ${theme.colors.gray200} 75%,
              ${theme.colors.gray50} 100%
            );
          `};
  }
`;
