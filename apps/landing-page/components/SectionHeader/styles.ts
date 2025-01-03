import styled, { css, keyframes } from "styled-components";
import { rem } from "polished";
import {
  space,
  typography,
  color,
  SpaceProps,
  ColorProps,
  TypographyProps,
} from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hasMarginBottom",
})<{ hasMarginBottom: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 720px;

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: ${({ theme }) => theme.spacing.s8};
    `}
`;

const animateText = keyframes`
    0% {
        background-position: 0 50%;
    }
    100% {
        background-position: 100% 50%;
    }
`;

interface TitleProps extends SpaceProps, ColorProps, TypographyProps {
  titleSize: "normal" | "large";
  as: string;
  hasAnimatedText: boolean;
}

export const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    !["hasAnimatedText", "titleSize", "lineHeight", "textAlign"].includes(prop),
})<TitleProps>`
  ${typography};
  ${space};
  ${color};
  font-family: ${({ theme }) => theme.typography.robotoFlex};
  font-size: ${({ titleSize }) =>
    titleSize === "normal" ? rem("42px") : rem("60px")};

  ${({ hasAnimatedText }) =>
    hasAnimatedText &&
    css`
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors.black} 20%,
        ${({ theme }) => theme.colors.blue500} 30%,
        ${({ theme }) => theme.colors.blue300} 70%,
        ${({ theme }) => theme.colors.purple500} 80%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background-size: 500% auto;
      animation: ${animateText} 5s ease-in-out infinite alternate;
    `} @media screen and ${({ theme }) => theme.device.max.md} {
    font-size: ${rem("32px")};
  }
`;
