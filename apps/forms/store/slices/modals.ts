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
  isConfirmModalOpen: false,
  confirmModalPayload: null,
  setCreateFormModalOpen: ({ isOpen }) =>
    set((state) => ({
      isCreateFormModalOpen: isOpen,
    })),
  setConfirmModalOpen: ({ isOpen, data }) =>
    set((state) => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
});
