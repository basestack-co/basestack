import styled, { css } from "styled-components";
import { rem } from "polished";

export const Card = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["p", "bg", "transitionBg", "height"].includes(prop),
})<{
  p?: string | number;
  bg?: string;
  transitionBg?: boolean;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: ${({ height }) => height || "100%"};
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

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: ${rem("1100px")};
  width: 100%;

  &::after {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.5;
    position: absolute;
    border-radius: 50%;
    z-index: -2;
    height: 500px;
    width: 100%;
    left: 0;
    top: -100px;
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    &::after {
      height: 250px;
    }
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    &::after {
      height: 150px;
    }
  }
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
    background-color: ${({ theme }) =>
      theme.colors[theme.isDarkMode ? "gray700" : "gray200"]};
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

export const containerBlurStyles = css`
  &::before {
    content: "";
    background: ${({ theme }) =>
      theme.isDarkMode ? "rgba(20, 20, 20, 0.7)" : "rgba(246, 246, 246, 0.7)"};
    -webkit-backdrop-filter: saturate(180%) blur(150px);
    backdrop-filter: saturate(180%) blur(150px);
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;
