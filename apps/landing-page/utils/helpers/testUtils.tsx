import theme from "@basestack/design-system/theme/lightTheme";
// Styles
import isPropValid from "@emotion/is-prop-valid";
import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";

interface WithChildrenProps {
  children: React.ReactNode;
}

interface AllProvidersProps extends WithChildrenProps {
  initialState?: Record<string, unknown>;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const renderWithAllProviders = (
  ui: React.ReactElement,
  initialState?: Record<string, unknown>,
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
