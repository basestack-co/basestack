import { RenderOptions, render } from "@testing-library/react";
import React from "react";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "../theme/lightTheme";

interface Props {
  children: React.ReactNode;
}

const WithThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: WithThemeProvider, ...options });

export { renderWithTheme };
