import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "../theme";

interface Props {
  children: React.ReactNode;
}

const WithThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithThemeProvider, ...options });

export { renderWithTheme };
