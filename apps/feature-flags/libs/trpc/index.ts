import { TRPCClientErrorLike } from "@trpc/react-query";
import { createTRPCNext } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
// Types
import type { AppRouter } from "server/routers/_app";
import type {
  inferRouterInputs,
  inferRouterOutputs,
  Maybe,
} from "@trpc/server";
// Utils
import superjson from "superjson";
import { getBaseUrl } from "utils/functions";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCNext<AppRouter>({
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
              if (
                ["BAD_REQUEST", "FORBIDDEN", "UNAUTHORIZED"].includes(
                  code as string
                )
              ) {
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
});

export const vanillaClient = createTRPCProxyClient<AppRouter>({
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
});
