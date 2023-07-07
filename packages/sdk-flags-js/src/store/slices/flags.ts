import { StateCreator } from "zustand/vanilla";
// Types
import { FlagsSliceState, Store } from "../types";

export const createFlagsSlice: StateCreator<Store, [], [], FlagsSliceState> = (
  set,
) => ({
  flags: [],
  setFlags: (payload) =>
    set(() => ({
      flags: payload,
    })),
});
