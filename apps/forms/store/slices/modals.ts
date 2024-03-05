import { StateCreator } from "zustand";
// Types
import { ModalsSliceState, Store } from "../types";

export const createModalsSlice: StateCreator<
  Store,
  [],
  [],
  ModalsSliceState
> = (set) => ({
  isCreateFormModalOpen: false,
  setCreateFormModalOpen: ({ isOpen }) =>
    set((state) => ({
      isCreateFormModalOpen: isOpen,
    })),
});
