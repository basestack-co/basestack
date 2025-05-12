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
  isAddFormMemberModalOpen: false,
  isCreateTeamModalOpen: false,
  isManageTeamModalOpen: false,
  teamModalPayload: null,
  setCreateFormModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateFormModalOpen: isOpen,
    })),
  setConfirmModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
  setAddFormMemberModalOpen: ({ isOpen }) =>
    set(() => ({
      isAddFormMemberModalOpen: isOpen,
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
