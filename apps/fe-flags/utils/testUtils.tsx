import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Locales
import { IntlProvider } from "react-intl";
import { messages } from "../locales";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";
// Contexts
import { ModalsContextProvider } from "contexts/modals";
// Auth
import { SessionProvider } from "next-auth/react";

interface WithChildrenProps {
  children: React.ReactNode;
}

interface AllProvidersProps extends WithChildrenProps {
  initialState?: {};
}

const AllProviders = ({ children, initialState = {} }: AllProvidersProps) => {
  return (
    // @ts-ignore
    <SessionProvider session={{ expires: null }}>
      <ModalsContextProvider>
        <IntlProvider locale="en" messages={messages.en}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </IntlProvider>
      </ModalsContextProvider>
    </SessionProvider>
  );
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
