import { StateCreator } from "zustand/vanilla";
// Types
import type { SdkSliceState, Store } from "../types";

export const createSdkSlice: StateCreator<Store, [], [], SdkSliceState> = (
  set,
) => ({
  version: "",
  // clears the entire store, actions included
  cleanStore: () => set({}, true),
  setVersion: (payload) =>
    set(() => ({
      version: payload,
    })),
});
