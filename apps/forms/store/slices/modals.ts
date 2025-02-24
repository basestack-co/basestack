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
    set(() => ({
      isCreateFormModalOpen: isOpen,
    })),
  setConfirmModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
});
