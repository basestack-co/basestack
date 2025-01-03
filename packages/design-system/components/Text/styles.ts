import styled, { css } from "styled-components";
import { space, typography, flexbox, compose } from "styled-system";
import { rem } from "polished";
import { TextProps, FontFamily } from "./types";

interface sharedStylesProps {
  color?: string;
  muted?: boolean;
  fontFamily?: FontFamily;
  lineTruncate?: boolean;
}

const sharedStyles = ({
  color,
  muted,
  fontFamily,
  lineTruncate,
}: sharedStylesProps) => css`
  ${compose(space, typography, flexbox)};
  font-family: ${({ theme }) =>
    fontFamily === "robotoFlex"
      ? theme.typography.robotoFlex
      : theme.typography.roboto};
  word-break: break-word;
  color: ${({ theme }) =>
    color || (muted ? theme.text.muted : theme.text.color)};

  ${lineTruncate &&
  css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;

export const XSmallText = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !["textAlign", "lineTruncate", "muted", "lineHeight"].includes(prop),
})<TextProps>`
  display: flex;
  font-size: ${rem("12px")};
  line-height: ${rem("14px")};
  font-weight: 400;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;

export const SmallText = styled.p.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "textAlign",
      "lineTruncate",
      "lineHeight",
      "flexShrink",
      "muted",
    ].includes(prop),
})<TextProps>`
  font-size: ${rem("14px")};
  line-height: ${rem("22px")};
  font-weight: 400;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;

export const MediumText = styled.p.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "textAlign",
      "lineTruncate",
      "lineHeight",
      "muted",
      "flexShrink",
    ].includes(prop),
})<TextProps>`
  font-size: ${rem("16px")};
  line-height: ${rem("24px")};
  font-weight: 500;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;

export const LargeText = styled.h3.withConfig({
  shouldForwardProp: (prop) =>
    !["textAlign", "lineTruncate", "muted", "lineHeight"].includes(prop),
})<TextProps>`
  font-size: ${rem("18px")};
  line-height: ${rem("26px")};
  font-weight: 500;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;

export const XLargeText = styled.h2.withConfig({
  shouldForwardProp: (prop) =>
    !["textAlign", "lineTruncate", "lineHeight", "muted"].includes(prop),
})<TextProps>`
  font-size: ${rem("20px")};
  line-height: ${rem("30px")};
  font-weight: 500;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;

export const XXLargeText = styled.h1.withConfig({
  shouldForwardProp: (prop) =>
    !["textAlign", "lineTruncate", "lineHeight", "muted"].includes(prop),
})<TextProps>`
  font-size: ${rem("24px")};
  line-height: ${rem("36px")};
  font-weight: 700;
  ${({ color, muted, fontFamily, lineTruncate }) =>
    sharedStyles({ color, muted, fontFamily, lineTruncate })};
`;
