import styled, { ThemedStyledProps } from "styled-components";
import { rem, transparentize } from "polished";
import { LabelVariant, LabelSize } from "./types";

const getSizeStyles = (size: LabelSize) => {
  const styles = {
    normal: {
      padding: `${rem("4px")} ${rem("6px")}`,
      fontSize: `${rem("14px")}`,
      lineHeight: `${rem("16px")}`,
      fontWeight: 400,
    },
    medium: {
      padding: `${rem("6px")} ${rem("8px")}`,
      fontSize: `${rem("16px")}`,
      lineHeight: `${rem("18px")}`,
      fontWeight: 500,
    },
  };

  return styles[size];
};

const getSolidStyles = (
  theme: ThemedStyledProps<any, any>,
  variant: LabelVariant
) => {
  const colors = {
    success: {
      color: theme.colors.white,
      backgroundColor: theme.colors.green400,
    },
    default: {
      color: theme.colors.gray600,
      backgroundColor: theme.colors.gray200,
    },
    info: {
      color: theme.colors.white,
      backgroundColor: theme.colors.primary,
    },
  };

  return colors[variant];
};

const getTranslucentStyles = (
  theme: ThemedStyledProps<any, any>,
  variant: LabelVariant
) => {
  const colors = {
    success: {
      color: theme.colors.green600,
      backgroundColor: transparentize(0.9, theme.colors.green400),
    },
    default: {
      color: theme.colors.gray600,
      backgroundColor: transparentize(0.9, theme.colors.gray400),
    },
    info: {
      color: theme.colors.blue500,
      backgroundColor: transparentize(0.9, theme.colors.blue400),
    },
  };

  return colors[variant];
};

export const StyledLabel = styled.div<{
  variant: LabelVariant;
  size: LabelSize;
  isTranslucent: boolean;
}>`
  display: flex;
  border-radius: 4px;
  ${({ size }) => getSizeStyles(size)};
  ${({ theme, variant, isTranslucent }) =>
    isTranslucent
      ? getTranslucentStyles(theme, variant)
      : getSolidStyles(theme, variant)};
`;
