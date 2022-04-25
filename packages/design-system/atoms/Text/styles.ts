import styled, { css } from "styled-components";
import { space } from "styled-system";
import { rem } from "polished";
import { TextProps } from "./types";

const sharedStyles = (color?: string, muted = false) => css`
  ${space};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  color: ${({ theme }) =>
    color || (muted ? theme.colors.gray600 : theme.colors.black)};
`;

export const XSmallText = styled.span<TextProps>`
  display: flex;
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("12px")};
  font-weight: 400;
`;

export const SmallText = styled.p<TextProps>`
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("14px")};
  font-weight: 400;
`;

export const MediumText = styled.p<TextProps>`
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("16px")};
  font-weight: 500;
`;

export const LargeText = styled.h3<TextProps>`
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("18px")};
  font-weight: 500;
`;

export const XLargeText = styled.h2<TextProps>`
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("20px")};
  font-weight: 700;
`;

export const XXLargeText = styled.h1<TextProps>`
  ${({ color, muted }) => sharedStyles(color, muted)};
  font-size: ${rem("24px")};
  font-weight: 700;
`;
