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
  inviteMemberModalPayload: null,
  isConfirmModalOpen: false,
  confirmModalPayload: null,
  isIntegrationModalOpen: false,
  isActivityModalOpen: false,
  setCreateEnvironmentModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isCreateEnvironmentModalOpen: isOpen,
      environmentModalPayload: data,
    })),
  setUpdateEnvironmentModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isUpdateEnvironmentModalOpen: isOpen,
      environmentModalPayload: data,
    })),
  setInviteMemberModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isInviteMemberModalOpen: isOpen,
      inviteMemberModalPayload: data,
    })),
  setCreateProjectModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateProjectModalOpen: isOpen,
    })),
  setCreateFlagModalOpen: ({ isOpen }) =>
    set(() => ({
      isCreateFlagModalOpen: isOpen,
    })),
  setUpdateFlagModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isUpdateFlagModalOpen: isOpen,
      flagModalPayload: data,
    })),
  setConfirmModalOpen: ({ isOpen, data }) =>
    set(() => ({
      isConfirmModalOpen: isOpen,
      ...(!isOpen ? {} : { confirmModalPayload: data }),
    })),
  setIntegrationModalOpen: ({ isOpen }) =>
    set(() => ({
      isIntegrationModalOpen: isOpen,
    })),
  setActivityModalOpen: ({ isOpen }) =>
    set(() => ({
      isActivityModalOpen: isOpen,
    })),
});
