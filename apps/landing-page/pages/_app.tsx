import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
// Fonts
import "material-symbols/rounded.css";
//Styles
import isPropValid from "@emotion/is-prop-valid";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import theme from "@basestack/design-system/theme/lightTheme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
import AppGlobalStyle from "../styles/applGlobalStyles";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <GlobalStyle />
          <AppGlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StyleSheetManager>
      </ThemeProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>
  );
}

export default MyApp;
