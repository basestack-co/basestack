import styled, { css } from "styled-components";
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
    `}
`;

interface TitleProps extends SpaceProps, ColorProps, TypographyProps {
  titleSize: "medium" | "large";
  as: string;
  titleMaxWidth: number | "initial";
}

export const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    !["titleSize", "lineHeight", "textAlign", "titleMaxWidth"].includes(prop),
})<TitleProps>`
  ${typography};
  ${space};
  ${color};
  font-family: ${({ theme }) => theme.typography.robotoFlex};
  font-size: ${({ titleSize }) =>
    titleSize === "medium" ? rem("36px") : rem("48px")};
  font-weight: 700;
  max-width: ${({ titleMaxWidth }) =>
    typeof titleMaxWidth === "number" ? `${titleMaxWidth}ch` : "initial"};

  @media screen and ${({ theme }) => theme.device.max.md} {
    font-size: ${({ titleSize }) =>
      titleSize === "medium" ? rem("24px") : rem("32px")};
  }
`;
