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
import type { TRPCClientErrorLike } from "@trpc/react";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "server/routers/_app";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { Maybe } from "@trpc/server";
// Utils
import superjson from "superjson";
import { getBaseUrl } from "utils/functions";

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
            refetchOnWindowFocus:
              false /* maybe this should be active on Prod */,
            staleTime: 1000,
            retry(failureCount, _err) {
              const err = _err as never as Maybe<
                TRPCClientErrorLike<AppRouter>
              >;
              const code = err?.data?.code;
              // Don't let an UNAUTHORIZED user to retry queries
              if (["BAD_REQUEST", "FORBIDDEN", "UNAUTHORIZED"].includes(code)) {
                return false;
              }
              const MAX_QUERY_RETRIES = 3;
              return failureCount < MAX_QUERY_RETRIES;
            },
          },
        },
      },
    };
  },
  ssr: false,
})(MyApp);
