import type { StateCreator } from "zustand";
// Types
import type { AppSliceState, Store } from "../types";

export const createAppSlice: StateCreator<Store, [], [], AppSliceState> = (
  set,
) => ({
  numberOfFlagsPerPage: 20,
  closeModalsOnClickOutside: true,
  isDarkMode: false,
  selectedView: "cards",
  closeNoActiveSubscriptionBanner: false,
  setDarkMode: (payload) =>
    set(() => ({
      isDarkMode: payload,
    })),
  setSelectedView: (payload) =>
    set(() => ({
      selectedView: payload.view,
    })),
  setCloseModalsOnClickOutside: () =>
    set((state) => ({
      closeModalsOnClickOutside: !state.closeModalsOnClickOutside,
    })),
  setNumberOfFlagsPerPage: (payload) =>
    set(() => ({
      numberOfFlagsPerPage: payload,
    })),
  setCloseNoActiveSubscriptionBanner: (payload) =>
    set(() => ({
      closeNoActiveSubscriptionBanner: payload,
    })),
});
