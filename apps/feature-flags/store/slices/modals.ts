import { StateCreator } from "zustand";
// Types
import {
  EnvironmentModalPayload,
  FlagModalPayload,
  ModalsSliceState,
  Store,
} from "../types";

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
  setCreateEnvironmentModalOpen: (
    isOpen,
    payload: EnvironmentModalPayload | null
  ) =>
    set((state) => ({
      isCreateEnvironmentModalOpen: isOpen,
      environmentModalPayload: payload,
    })),
  setUpdateEnvironmentModalOpen: (
    isOpen,
    payload: EnvironmentModalPayload | null
  ) =>
    set((state) => ({
      isUpdateEnvironmentModalOpen: isOpen,
      environmentModalPayload: payload,
    })),
  setInviteMemberModalOpen: (isOpen) =>
    set((state) => ({
      isInviteMemberModalOpen: isOpen,
    })),
  setCreateProjectModalOpen: (isOpen) =>
    set((state) => ({
      isCreateProjectModalOpen: isOpen,
    })),
  setCreateFlagModalOpen: (isOpen) =>
    set((state) => ({
      isCreateFlagModalOpen: isOpen,
    })),
  setUpdateFlagModalOpen: (isOpen, payload: FlagModalPayload | null) =>
    set((state) => ({
      isUpdateFlagModalOpen: isOpen,
      flagModalPayload: payload,
    })),
});
