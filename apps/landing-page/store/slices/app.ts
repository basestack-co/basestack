import type { StateCreator } from "zustand";
// Types
import type { AppSliceState, Store } from "../types";

export const createAppSlice: StateCreator<Store, [], [], AppSliceState> = (
  set,
) => ({
  isDarkMode: false,
  setDarkMode: (payload) =>
    set(() => ({
      isDarkMode: payload,
    })),

  stargazers: 0,
  setStargazers: (payload) =>
    set(() => ({
      stargazers: payload,
    })),
});
