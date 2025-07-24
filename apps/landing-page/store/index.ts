import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Slices
import { createAppSlice } from "./slices/app";
// Types
import type { Store } from "./types";

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
    }),
    {
      version: 1,
      name: "landing-page",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);

// @ts-ignore
export const clearLocalStorage = () => useStore.persist.clearStorage();
