import styled, { css } from "styled-components";
import { space, typography, compose } from "styled-system";
import { rem } from "polished";
import { TextProps } from "./types";

const sharedStyles = (color?: string, muted = false) => css`
  ${compose(space, typography)};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) =>
    color || (muted ? theme.colors.gray500 : theme.colors.black)};
`;

export const XSmallText = styled.span<TextProps>`
  display: flex;
  font-size: ${rem("12px")};
  line-height: ${rem("14px")};
  font-weight: 400;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;

export const SmallText = styled.p<TextProps>`
  font-size: ${rem("14px")};
  line-height: ${rem("20px")};
  font-weight: 400;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;

export const MediumText = styled.p<TextProps>`
  font-size: ${rem("16px")};
  line-height: ${rem("22px")};
  font-weight: 500;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;

export const LargeText = styled.h3<TextProps>`
  font-size: ${rem("18px")};
  line-height: ${rem("24px")};
  font-weight: 500;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;

export const XLargeText = styled.h2<TextProps>`
  font-size: ${rem("20px")};
  line-height: ${rem("26px")};
  font-weight: 500;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;

export const XXLargeText = styled.h1<TextProps>`
  font-size: ${rem("24px")};
  line-height: ${rem("32px")};
  font-weight: 700;
  ${({ color, muted }) => sharedStyles(color, muted)};
`;
