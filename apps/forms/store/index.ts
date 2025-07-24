import { create } from "zustand/index";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAppSlice } from "./slices/app";
// Slices
import { createModalsSlice } from "./slices/modals";
// Types
import type { Store } from "./types";

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
