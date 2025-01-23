import { StateCreator } from "zustand";
// Types
import { AppSliceState, Store } from "../types";

export const createAppSlice: StateCreator<Store, [], [], AppSliceState> = (
  set,
) => ({
  isDarkMode: false,
  setDarkMode: (payload) =>
    set(() => ({
      isDarkMode: payload,
    })),
});
