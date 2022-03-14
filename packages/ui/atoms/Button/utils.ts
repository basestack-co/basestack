import { Size, Target, Type, Variant } from "@/components/atoms/Button/types";
import { css, DefaultTheme } from "styled-components";
import { darken, rem, transparentize } from "polished";

export const handleButtonSize = (size?: Size) => {
  switch (size) {
    case "large":
      return css`
        height: ${rem("60px")};
        font-size: ${rem("18px")};
        line-height: ${rem("25px")};
        padding: 0 ${rem("40px")};
      `;
    case "medium":
      return css`
        height: ${rem("54px")};
        font-size: ${rem("16px")};
        line-height: ${rem("22px")};
        padding: 0 ${rem("34px")};
      `;
    case "normal":
      return css`
        height: ${rem("48px")};
        font-size: ${rem("16px")};
        line-height: ${rem("22px")};
        padding: 0 ${rem("30px")};
      `;
    default:
    case "small":
      return css`
        height: ${rem("46px")};
        font-size: ${rem("14px")};
        line-height: ${rem("19px")};
        padding: 0 ${rem("24px")};
      `;
    case "xSmall":
      return css`
        height: ${rem("42px")};
        font-size: ${rem("14px")};
        line-height: ${rem("19px")};
        padding: 0 ${rem("20px")};
      `;
  }
};

export const handleButtonsColors = (theme: DefaultTheme) => ({
  primary: {
    outline: {
      color: theme.colors.primary,
      borderColor: theme.colors.primary,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.white,
      borderColor: "transparent",
      backgroundColor: theme.colors.primary,
    },
  },
  secondary: {
    outline: {
      color: theme.colors.secondary,
      borderColor: theme.colors.secondary,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.white,
      borderColor: "transparent",
      backgroundColor: theme.colors.secondary,
    },
  },
  tertiary: {
    outline: {
      color: theme.colors.gray3,
      borderColor: theme.colors.gray3,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.primary,
      borderColor: "transparent",
      backgroundColor: theme.colors.gray6,
    },
  },
  neutral: {
    outline: {
      color: theme.colors.gray2,
      borderColor: theme.colors.gray2,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.primary,
      borderColor: "transparent",
      backgroundColor: "transparent",
    },
  },
  success: {
    outline: {
      color: theme.colors.success,
      borderColor: theme.colors.success,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.white,
      borderColor: "transparent",
      backgroundColor: theme.colors.success,
    },
  },
  warning: {
    outline: {
      color: theme.colors.warning,
      borderColor: theme.colors.warning,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.white,
      borderColor: "transparent",
      backgroundColor: theme.colors.warning,
    },
  },
  danger: {
    outline: {
      color: theme.colors.error,
      borderColor: theme.colors.error,
      backgroundColor: "transparent",
    },
    filled: {
      color: theme.colors.white,
      borderColor: "transparent",
      backgroundColor: theme.colors.error,
    },
  },
});

export const darkenColors = (
  theme: DefaultTheme,
  amount: number,
  type: Type,
  variant: Variant,
  target: Target
) => {
  return darken(
    amount || 0.1,
    handleButtonsColors(theme)[type || "primary"][variant || "filled"][target]
  );
};

export const lightenColors = (
  theme: DefaultTheme,
  amount: number,
  type: Type,
  variant: Variant,
  target: Target
) => {
  return transparentize(
    amount || 0.6,
    handleButtonsColors(theme)[type || "primary"][variant || "filled"][target]
  );
};
