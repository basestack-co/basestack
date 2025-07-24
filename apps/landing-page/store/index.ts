import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
// Types
import { Store } from "./types";
// Slices
import { createAppSlice } from "./slices/app";

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
    }),
    {
      version: 1,
      name: "landing-page",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);

export const clearLocalStorage = () => useStore.persist.clearStorage();
