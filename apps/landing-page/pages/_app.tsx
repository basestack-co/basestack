import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
//Styles
import isPropValid from "@emotion/is-prop-valid";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import theme from "@basestack/design-system/theme/lightTheme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
// Fonts
import "material-symbols";
// Utils
import { Toaster } from "react-hot-toast";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-right" />
        </StyleSheetManager>
      </ThemeProvider>
      {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
        <Script
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!}
          src="https://analytics.umami.is/script.js"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}

export default MyApp;
