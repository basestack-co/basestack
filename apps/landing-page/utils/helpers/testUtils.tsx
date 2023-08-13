import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Styles
import isPropValid from "@emotion/is-prop-valid";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import theme from "@basestack/design-system/theme/lightTheme";

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
  options?: Omit<RenderOptions, "wrapper">,
) =>
  render(ui, {
    // @ts-ignore
    wrapper: (props) => <AllProviders initialState={initialState} {...props} />,
    ...options,
  });

const WithThemeProvider = ({ children }: WithChildrenProps) => (
  <ThemeProvider theme={theme}>
    <StyleSheetManager shouldForwardProp={isPropValid}>
      {children}
    </StyleSheetManager>
  </ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
  // @ts-ignore
) => render(ui, { wrapper: WithThemeProvider, ...options });

export { renderWithAllProviders, renderWithTheme };
