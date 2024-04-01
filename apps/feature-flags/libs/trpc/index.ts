import { TRPCClientErrorLike } from "@trpc/react-query";
import { createTRPCNext } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink, TRPCLink } from "@trpc/client";
import { observable } from "@trpc/server/observable";
// Types
import type { AppRouter } from "server/routers/_app";
import type {
  inferRouterInputs,
  inferRouterOutputs,
  Maybe,
} from "@trpc/server";
// Utils
import superjson from "superjson";
import { getBaseUrl } from "@basestack/utils";

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const customLink: TRPCLink<AppRouter> = () => {
  // here we just got initialized in the app - this happens once per app
  // useful for storing cache for instance
  return ({ next, op }) => {
    // this is when passing the result to the next link
    // each link needs to return an observable which propagates results
    return observable((observer) => {
      return next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(err) {
          observer.error(err);
          if (err?.data?.code === "FORBIDDEN") {
            const win: Window = window;
            // TODO: find a better way to do this
            win.location = "/";
          }
        },
        complete() {
          observer.complete();
        },
      });
    });
  };
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        customLink,
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
                  code as string,
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
