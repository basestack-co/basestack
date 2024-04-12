import styled, { css } from "styled-components";
import { space, flexbox, layout, compose } from "styled-system";
import { rem } from "polished";
import { LabelVariant, LabelSize } from "./types";

const getGap = (size: LabelSize) => {
  const styles = {
    small: {
      gap: `${rem("6px")}`,
    },
    normal: {
      gap: `${rem("8px")}`,
    },
    medium: {
      gap: `${rem("10px")}`,
    },
  };

  return styles[size];
};

const getSizeStyles = (size: LabelSize) => {
  const styles = {
    small: {
      padding: `${rem("4px")} ${rem("6px")}`,
      fontSize: `${rem("12px")}`,
      lineHeight: `${rem("16px")}`,
      fontWeight: 400,
    },
    normal: {
      padding: `${rem("6px")} ${rem("8px")}`,
      fontSize: `${rem("14px")}`,
      lineHeight: `${rem("16px")}`,
      fontWeight: 400,
    },
    medium: {
      padding: `${rem("8px")} ${rem("10px")}`,
      fontSize: `${rem("16px")}`,
      lineHeight: `${rem("18px")}`,
      fontWeight: 400,
    },
  };

  return styles[size];
};

export const StyledLabel = styled.div<{
  variant: LabelVariant;
  size: LabelSize;
  isTranslucent: boolean;
  hasChildren: boolean;
  isUppercase: boolean;
}>`
  display: flex;
  border-radius: 4px;
  ${({ size }) => getSizeStyles(size)};
  ${({ theme, variant, isTranslucent }) =>
    isTranslucent
      ? theme.label.translucent[variant]
      : theme.label.solid[variant]};
  ${({ hasChildren, size }) =>
    hasChildren &&
    css`
      align-items: center;
      ${getGap(size)};
    `}
  ${({ isUppercase }) =>
    isUppercase &&
    css`
      text-transform: uppercase;
    `}
  ${compose(flexbox, space, layout)};
`;

export const LabelDotContainer = styled.div<{
  variant: LabelVariant;
  size: LabelSize;
  isUppercase: boolean;
}>`
  display: flex;
  align-items: center;
  font-size: ${({ size }) => getSizeStyles(size).fontSize};
  font-weight: ${({ size }) => getSizeStyles(size).fontWeight};
  line-height: ${({ size }) => getSizeStyles(size).lineHeight};
  ${({ isUppercase }) =>
    isUppercase &&
    css`
      text-transform: uppercase;
    `}
  ${compose(flexbox, space, layout)};
`;

export const LabelDot = styled.div<{
  variant: LabelVariant;
  isTranslucent: boolean;
}>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${rem("14px")};
  height: ${rem("14px")};
  margin-right: ${rem("4px")};
  border-radius: 50%;
  ${({ theme, variant, isTranslucent }) =>
    isTranslucent
      ? theme.label.translucent[variant]
      : theme.label.solid[variant]};
`;
