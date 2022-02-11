import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Store
import { Provider } from "react-redux";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "ui/theme/theme.semantic";

const WithThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithThemeProvider, ...options });

export { renderWithTheme };
