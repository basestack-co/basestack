import defaultTheme from "@basestack/design-system/theme/lightTheme";
import isPropValid from "@emotion/is-prop-valid";
import { RenderResult, render } from "@testing-library/react";
import React from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";

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
