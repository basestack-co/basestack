import { StateCreator } from "zustand";
// Types
import { AppSliceState, Store } from "../types";

export const createAppSlice: StateCreator<Store, [], [], AppSliceState> = (
  set,
) => ({
  closeModalsOnClickOutside: true,
  isDarkMode: false,
  selectedView: "cards",
  // clears the entire store, actions included
  cleanStore: () => set({}, true),
  setDarkMode: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),
  setSelectedView: (payload) =>
    set(() => ({
      selectedView: payload.view,
    })),
  setCloseModalsOnClickOutside: () =>
    set((state) => ({
      closeModalsOnClickOutside: !state.closeModalsOnClickOutside,
    })),
});
