import React from "react";
import theme from "@basestack/design-system/theme";
import { rem } from "polished";
import { Icon, Spinner } from "@basestack/design-system";
import { DefaultToastOptions } from "react-hot-toast";

export const toastOptions: DefaultToastOptions = {
  style: {
    border: "none",
    boxShadow: theme.shadow.elevation3,
    padding: theme.spacing.s4,
    fontSize: rem("14px"),
    color: theme.colors.black,
    borderRadius: "6px",
    fontFamily: theme.typography.roboto,
  },
  success: {
    icon: <Icon icon="check_circle" color={theme.colors.green400} />,
  },
  error: {
    icon: <Icon icon="error" color={theme.colors.red400} />,
  },
  loading: {
    icon: <Spinner size="small" />,
  },
};
