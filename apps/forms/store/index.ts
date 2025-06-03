import { create } from "zustand/index";
import { persist, createJSONStorage } from "zustand/middleware";
// Types
import { Store } from "./types";
// Slices
import { createModalsSlice } from "./slices/modals";
import { createAppSlice } from "./slices/app";

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createModalsSlice(...a),
    }),
    {
      version: 1,
      name: "forms-app",
      storage: createJSONStorage(() => localStorage),
      // @ts-ignore
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        closeModalsOnClickOutside: state.closeModalsOnClickOutside,
        closeNoActiveSubscriptionBanner: state.closeNoActiveSubscriptionBanner,
      }),
    },
  ),
);

// @ts-ignore
export const clearLocalStorage = () => useStore.persist.clearStorage();
