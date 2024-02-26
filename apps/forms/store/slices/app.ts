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
  setDarkMode: (payload) =>
    set(() => ({
      isDarkMode: payload,
    })),
  setCloseModalsOnClickOutside: () =>
    set((state) => ({
      closeModalsOnClickOutside: !state.closeModalsOnClickOutside,
    })),
});
