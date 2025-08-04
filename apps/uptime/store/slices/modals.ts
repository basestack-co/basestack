import type { StateCreator } from "zustand";
// Types
import type { ModalsSliceState, Store } from "../types";

export const createModalsSlice: StateCreator<
  Store,
  [],
  [],
  ModalsSliceState
> = (set) => ({
  isConfirmModalOpen: false,
  confirmModalPayload: null,
  isCreateTeamModalOpen: false,
  isManageTeamModalOpen: false,
  teamModalPayload: null,
  setConfirmModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
  setCreateTeamModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateTeamModalOpen: isOpen,
    })),
  setManageTeamModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isManageTeamModalOpen: isOpen,
      teamModalPayload: data,
    })),
});
