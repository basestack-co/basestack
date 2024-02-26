import { StateCreator } from "zustand";
// Types
import { ModalsSliceState, Store } from "../types";

export const createModalsSlice: StateCreator<
  Store,
  [],
  [],
  ModalsSliceState
> = (set) => ({
  isExampleModal: false,
  setExampleModal: ({ isOpen }) =>
    set((state) => ({
      isExampleModal: isOpen,
    })),
});
