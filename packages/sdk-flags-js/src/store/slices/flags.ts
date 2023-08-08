import { StateCreator } from "zustand/vanilla";
// Types
import type { FlagsSliceState, Store } from "../types";

export const createFlagsSlice: StateCreator<Store, [], [], FlagsSliceState> = (
  set,
) => ({
  flags: [],
  setFlags: (payload) =>
    set(() => ({
      flags: payload,
    })),
});
