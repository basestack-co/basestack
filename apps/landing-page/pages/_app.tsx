import React from "react";
import { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
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
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster position="bottom-right" />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
