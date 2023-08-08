import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
// Types
import type { Store, Persist } from "./types";
// Slices
import { createSdkSlice } from "./slices/sdk";
import { createFlagsSlice } from "./slices/flags";

const store = createStore<Store>(
  (persist as Persist)(
    (...a) => ({
      ...createSdkSlice(...a),
      ...createFlagsSlice(...a),
    }),
    {
      version: 1,
      name: "basestack-flags-sdk",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (state) => ({
        version: state.version,
      }),
    },
  ),
);

export default store;
