import { create } from "zustand";
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
      name: "feature-flags-app",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        selectedView: state.selectedView,
        numberOfFlagsPerPage: state.numberOfFlagsPerPage,
        closeModalsOnClickOutside: state.closeModalsOnClickOutside,
        closeNoActiveSubscriptionBanner: state.closeNoActiveSubscriptionBanner,
      }),
    },
  ),
);
