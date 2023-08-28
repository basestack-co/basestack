import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { persist, createJSONStorage } from "zustand/middleware";
// Types
import { Store, Persist } from "./types";
// Slices
import { createModalsSlice } from "./slices/modals";
import { createAppSlice } from "./slices/app";

export const useStore = createWithEqualityFn<Store>(
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
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        selectedView: state.selectedView,
        numberOfFlagsPerPage: state.numberOfFlagsPerPage,
        closeModalsOnClickOutside: state.closeModalsOnClickOutside,
      }),
    },
  ),
  shallow,
);

// @ts-ignore
export const clearLocalStorage = () => useStore.persist.clearStorage();
