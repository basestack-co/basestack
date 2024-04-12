import React from "react";
import { AppProps } from "next/app";
import { useStore } from "store";
//Styles
import isPropValid from "@emotion/is-prop-valid";
import { ThemeProvider, StyleSheetManager } from "styled-components";
import darkTheme from "@basestack/design-system/theme/darkTheme";
import lightTheme from "@basestack/design-system/theme/lightTheme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
// Modals
import Modals from "modals";
// Auth
import { SessionProvider } from "next-auth/react";
// Server
import { trpc } from "libs/trpc";
// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-expect-error
  const Layout = Component.Layout || Noop;
  const isDarkMode = useStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Modals />
        </StyleSheetManager>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
