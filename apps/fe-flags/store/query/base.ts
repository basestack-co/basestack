import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Utils
import fetch from "isomorphic-unfetch";
import { prepareHeaders, baseUrl } from "./utils";

// Define Projects service using BASE API URL and endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    fetchFn: fetch,
    prepareHeaders,
  }),
  tagTypes: ["Projects"],
  endpoints: () => ({}),
});

// auto-generated based on the defined endpoints
// export const {} = baseApi;
