import React from "react";
import { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "ui/theme/theme.semantic";
import GlobalStyle from "ui/theme/GlobalStyle";
//Locales
import { IntlProvider } from "react-intl";
import { language, messages } from "locales";
// Store
import { Provider } from "react-redux";
import { store } from "store";
// Modals
import Modals from "modals";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;
  return (
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages[language]}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Modals />
        </ThemeProvider>
      </IntlProvider>
    </Provider>
  );
}

export default MyApp;
