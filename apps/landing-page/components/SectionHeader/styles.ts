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
import theme from "@basestack/design-system/theme/lightTheme";

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
}

export const Title = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    !["titleSize", "lineHeight", "textAlign"].includes(prop),
})<TitleProps>`
  ${typography};
  ${space};
  ${color};
  font-family: ${({ theme }) => theme.typography.robotoFlex};
  font-size: ${({ titleSize }) =>
    titleSize === "medium" ? rem("36px") : rem("48px")};
  font-weight: 700;

  @media screen and ${({ theme }) => theme.device.max.md} {
    font-size: ${({ titleSize }) =>
      titleSize === "medium" ? rem("24px") : rem("32px")};
  }
`;

export const Label = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
  padding: 0 ${({ theme }) => theme.spacing.s3};
  height: ${rem("26px")};
  border-radius: ${rem("13px")};
  box-shadow: ${({ theme }) => theme.shadow.elevation2};
  background-color: ${({ theme }) =>
    theme.isDarkMode ? theme.colors.gray800 : theme.colors.white};
`;
