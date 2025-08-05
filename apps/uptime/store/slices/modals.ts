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
  isCreateMonitorModalOpen: false,
  isUpdateMonitorModalOpen: false,
  isAddServiceMemberModalOpen: false,
  isCreateServiceModalOpen: false,
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
  setAddServiceMemberModalOpen: ({ isOpen }) =>
    set(() => ({
      isAddServiceMemberModalOpen: isOpen,
    })),
  setCreateServiceModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateServiceModalOpen: isOpen,
    })),
  setCreateMonitorModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateMonitorModalOpen: isOpen,
    })),
  setUpdateMonitorModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isUpdateMonitorModalOpen: isOpen,
      monitorModalPayload: data,
    })),
});
