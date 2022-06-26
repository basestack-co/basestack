import React from "react";
import { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
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
// Server
import { withTRPC } from "@trpc/next";
import { AppRouter } from "server/routers/_app";
import { SSRContext } from "libs/trpc";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
// Utils
import superjson from "superjson";

const Noop = ({ children }: { children: React.ReactNode }) => children;

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

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

export default withTRPC<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],

      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false /* be this should be active on Prod */,
          },
        },
      },
    };
  },
  ssr: false,
})(MyApp);
