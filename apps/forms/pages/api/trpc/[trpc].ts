import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { createContext } from "server/context";
import { appRouter } from "server/routers/_app";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createContext(req),
    onError({ error }) {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        // eslint-disable no-console
        console.error("Something went wrong", error);
      }
    },
    batching: {
      enabled: true,
    },
  });
}
