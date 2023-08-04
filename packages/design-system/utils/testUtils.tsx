import React from "react";
import isPropValid from "@emotion/is-prop-valid";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import defaultTheme from "@basestack/design-system/theme/lightTheme";
import { render, RenderResult } from "@testing-library/react";

const Provider = ({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme: any;
}) => (
  <ThemeProvider theme={theme}>
    <StyleSheetManager shouldForwardProp={isPropValid}>
      {children}
    </StyleSheetManager>
  </ThemeProvider>
);

export const renderWithTheme = (
  ui: React.ReactElement,
  options?: any,
): RenderResult => render(ui, { wrapper: Provider, ...options });
