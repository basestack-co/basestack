import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// Slices
import appReducer from "./slices/app";
import modalsReducer from "./slices/modals";
// Queries
import { baseApi } from "./query/base";
// Utils
import { rtkQueryErrorLogger } from "./query/utils";

export const store = configureStore({
  reducer: {
    app: appReducer,
    modals: modalsReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      // Adding the api middleware enables caching, invalidation, polling,
      .concat(baseApi.middleware)
      .concat(rtkQueryErrorLogger),

  devTools: process.env.NODE_ENV !== "production",
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
