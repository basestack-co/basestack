import {
  AnyAction,
  combineReducers,
  configureStore,
  EnhancedStore,
  Middleware,
  Reducer,
} from "@reduxjs/toolkit";

export function setupApiStore<
  A extends {
    reducer: Reducer<any, any>;
    reducerPath: string;
    middleware: Middleware;
    util: { resetApiState(): any };
  },
  R extends Record<string, Reducer<any, any>> = Record<never, never>
>(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
  /*
   * Modified version of RTK Query's helper function:
   * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
   */
  const getStore = (): EnhancedStore =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware
        ),
    });

  type StoreType = EnhancedStore<
    {
      api: ReturnType<A["reducer"]>;
    } & {
      [K in keyof R]: ReturnType<R[K]>;
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore() as StoreType;
  refObj.store = store;

  return refObj;
}
