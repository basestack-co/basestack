import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";

interface WithChildrenProps {
  children: React.ReactNode;
}

interface AllProvidersProps extends WithChildrenProps {
  initialState?: {};
}

const AllProviders = ({ children, initialState = {} }: AllProvidersProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const renderWithAllProviders = (
  ui: React.ReactElement,
  initialState?: {},
  options?: Omit<RenderOptions, "wrapper">
) =>
  render(ui, {
    wrapper: (props) => <AllProviders initialState={initialState} {...props} />,
    ...options,
  });

const WithThemeProvider = ({ children }: WithChildrenProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithThemeProvider, ...options });

export { renderWithAllProviders, renderWithTheme };