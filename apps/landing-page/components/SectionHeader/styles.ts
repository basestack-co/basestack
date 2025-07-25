import { Text } from "@basestack/design-system";
import { rem } from "polished";
import styled, { css, keyframes } from "styled-components";
import {
  type ColorProps,
  color,
  type SpaceProps,
  space,
  type TypographyProps,
  typography,
} from "styled-system";

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["hasMarginBottom", "alignItems"].includes(prop),
})<{ hasMarginBottom: boolean; alignItems: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};

  ${({ hasMarginBottom }) =>
    hasMarginBottom &&
    css`
      margin-bottom: ${({ theme }) => theme.spacing.s8};
    `};

  @media screen and ${({ theme }) => theme.device.max.sm} {
    align-items: flex-start;
    h1,
    h2,
    p,
    span {
      text-align: left;
    }
  }
`;

interface TitleProps extends SpaceProps, ColorProps, TypographyProps {
  titleSize: "medium" | "large" | "xLarge";
  as: string;
  titleMaxWidth: number | "initial";
  hasAnimatedText: boolean;
}

const animateText = keyframes`
    0% {
        background-position: 0 50%;
    }
    100% {
        background-position: 100% 50%;
    }
`;

const getTitleSize = {
  medium: rem("36px"),
  large: rem("48px"),
  xLarge: rem("60px"),
};

const getTabletTitleSize = {
  medium: rem("32px"),
  large: rem("36px"),
  xLarge: rem("48px"),
};

const getMobileTitleSize = {
  medium: rem("28px"),
  large: rem("32px"),
  xLarge: rem("36px"),
};

export const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "titleSize",
      "lineHeight",
      "textAlign",
      "titleMaxWidth",
      "hasAnimatedText",
    ].includes(prop),
})<TitleProps>`
  ${typography};
  ${space};
  ${color};
  font-family: ${({ theme }) => theme.typography.robotoFlex};
  font-size: ${({ titleSize }) => getTitleSize[titleSize]};
  font-weight: 700;
  max-width: ${({ titleMaxWidth }) =>
    typeof titleMaxWidth === "number" ? `${titleMaxWidth}ch` : "initial"};

  ${({ hasAnimatedText }) =>
    hasAnimatedText &&
    css`
      background: linear-gradient(
        to right,
        ${({ theme }) => theme.colors[theme.isDarkMode ? "gray300" : "black"]}
          20%,
        ${({ theme }) => theme.colors[theme.isDarkMode ? "blue300" : "blue500"]}
          30%,
        ${({ theme }) => theme.colors[theme.isDarkMode ? "blue200" : "blue300"]}
          70%,
        ${({ theme }) =>
          theme.colors[theme.isDarkMode ? "purple300" : "purple500"]}
          80%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
      background-size: 500% auto;
      animation: ${animateText} 5s ease-in-out infinite alternate;
    `}

  @media screen and ${({ theme }) => theme.device.max.xl} {
    font-size: ${({ titleSize }) => getTabletTitleSize[titleSize]};
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    font-size: ${({ titleSize }) => getMobileTitleSize[titleSize]};
  }
`;

export const StyledCaption = styled(Text)`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors[theme.isDarkMode ? "blue300" : "blue400"]},
    ${({ theme }) => theme.colors[theme.isDarkMode ? "purple300" : "purple400"]}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
`;
