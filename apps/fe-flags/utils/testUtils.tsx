import React from "react";
import { render, RenderOptions } from "@testing-library/react";
// Store
import { Provider } from "react-redux";
import { store } from "../store";
// Locales
import { IntlProvider } from "react-intl";
import { messages } from "../locales";
// Styles
import { ThemeProvider } from "styled-components";
import theme from "design-system/theme";
// Auth
import { SessionProvider } from "next-auth/react";

interface AllProvidersProps {
  initialState?: {};
}

const AllProviders: React.FC<AllProvidersProps> = ({
  children,
  initialState = {},
}) => {
  return (
    <SessionProvider session={{ expires: null }}>
      <Provider store={{ ...store, ...initialState }}>
        <IntlProvider locale="en" messages={messages.en}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </IntlProvider>
      </Provider>
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

const WithThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const renderWithTheme = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithThemeProvider, ...options });

const WithReduxProvider: React.FC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

const renderWithRedux = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: WithReduxProvider, ...options });

export { renderWithAllProviders, renderWithTheme, renderWithRedux };
