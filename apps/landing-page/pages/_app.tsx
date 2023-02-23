import React from "react";
import { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
// Fonts
import "material-symbols";
// Utils
import { Toaster } from "react-hot-toast";
// Analytics
import PiwikProProvider from "@piwikpro/next-piwik-pro";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;


  console.log("process.env = ", process.env)
  return (
    <PiwikProProvider
      containerUrl={process.env.NEXT_PUBLIC_PIWIK_PRO_ACCOUNT_URL}
      containerId={process.env.NEXT_PUBLIC_PIWIK_PRO_CONTAINER_ID!}
    >
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster position="bottom-right" />
        </>
      </ThemeProvider>
    </PiwikProProvider>
  );
}

export default MyApp;
