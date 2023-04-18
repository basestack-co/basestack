import { StateCreator } from "zustand";
// Types
import { ModalsSliceState, Store } from "../types";

export const createModalsSlice: StateCreator<
  Store,
  [],
  [],
  ModalsSliceState
> = (set) => ({
  isCreateEnvironmentModalOpen: false,
  isUpdateEnvironmentModalOpen: false,
  isInviteMemberModalOpen: false,
  isCreateProjectModalOpen: false,
  isCreateFlagModalOpen: false,
  isUpdateFlagModalOpen: false,
  environmentModalPayload: null,
  flagModalPayload: null,
  isConfirmModalOpen: false,
  confirmModalPayload: null,
  setCreateEnvironmentModalOpen: ({ isOpen, data }) =>
    set((state) => ({
      isCreateEnvironmentModalOpen: isOpen,
      environmentModalPayload: data,
    })),
  setUpdateEnvironmentModalOpen: ({ isOpen, data }) =>
    set((state) => ({
      isUpdateEnvironmentModalOpen: isOpen,
      environmentModalPayload: data,
    })),
  setInviteMemberModalOpen: ({ isOpen }) =>
    set((state) => ({
      isInviteMemberModalOpen: isOpen,
    })),
  setCreateProjectModalOpen: ({ isOpen }) =>
    set((state) => ({
      isCreateProjectModalOpen: isOpen,
    })),
  setCreateFlagModalOpen: ({ isOpen }) =>
    set((state) => ({
      isCreateFlagModalOpen: isOpen,
    })),
  setUpdateFlagModalOpen: ({ isOpen, data }) =>
    set((state) => ({
      isUpdateFlagModalOpen: isOpen,
      flagModalPayload: data,
    })),
  setConfirmModalOpen: ({ isOpen, data }) =>
    set((state) => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
});
