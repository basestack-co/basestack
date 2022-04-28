import React from "react";
import { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "ui/theme";
import GlobalStyle from "ui/theme/GlobalStyle";
//Locales
import { IntlProvider } from "react-intl";
import { language, messages } from "locales";
// Store
import { Provider as StoreProvider } from "react-redux";
import { store } from "store";
// Modals
import Modals from "modals";
// Auth
import { SessionProvider } from "next-auth/react";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;
  return (
    <SessionProvider session={pageProps.session}>
      <StoreProvider store={store}>
        <IntlProvider locale={language} messages={messages[language]}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Modals />
            </>
          </ThemeProvider>
        </IntlProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

export default MyApp;
