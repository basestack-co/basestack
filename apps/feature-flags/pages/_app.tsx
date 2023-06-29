import React from "react";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
// Modals
import Modals from "modals";
// Auth
import { SessionProvider } from "next-auth/react";
// Server
import { trpc } from "libs/trpc";
// Fonts
import "material-symbols";
// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toastOptions } from "utils/toastOptions";

dayjs.extend(relativeTime);

const Noop = ({ children }: { children: React.ReactNode }) => children;

function MyApp({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const Layout = Component.Layout || Noop;
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Modals />
          <Toaster position="bottom-right" toastOptions={toastOptions} />
        </>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
