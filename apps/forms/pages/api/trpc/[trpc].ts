import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "server/context";
import { appRouter } from "server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      /* eslint-disable no-console */
      console.error("Something went wrong", error);
    }
  },
  batching: {
    enabled: true,
  },
  /* responseMeta(opts) {
       const { ctx, paths, errors, type } = opts;
       // Form API Routes
       // const allForm = paths && paths.every((path) => path.includes("form"));
       // checking that no procedures errored
       const allOk = errors.length === 0;
       // checking we're doing a query request
       const isQuery = type === "query";
       if (ctx?.res && allOk && isQuery) {
         // cache request for 1 day + revalidate once every second
         const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
         return {
           headers: {
             "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
           },
         };
       }
       return {};
     }, */
});
