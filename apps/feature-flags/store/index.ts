import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// Types
import { Store, Persist } from "./types";
// Slices
import { createModalsSlice } from "./slices/modals";
import { createAppSlice } from "./slices/app";

export const useStore = create<Store>(
  (persist as Persist)(
    (...a) => ({
      ...createAppSlice(...a),
      ...createModalsSlice(...a),
    }),
    {
      version: 1,
      name: "feature-flags-app",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

// @ts-ignore
export const clearLocalStorage = () => useStore.persist.clearStorage();
