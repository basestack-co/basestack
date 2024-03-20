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
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
// Server
import { trpc } from "libs/trpc";
// Fonts
import "material-symbols/sharp.css";
// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;
  const isDarkMode = useStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider theme={theme}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <GlobalStyle />
          <SignedIn>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Modals />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </StyleSheetManager>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default trpc.withTRPC(MyApp);
