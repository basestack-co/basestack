import { StateCreator } from "zustand";
// Types
import { AppSliceState, Store } from "../types";

export const createAppSlice: StateCreator<Store, [], [], AppSliceState> = (
  set,
) => ({
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
});
