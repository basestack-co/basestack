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
  setCreateEnvironmentModalOpen: (payload: EnvironmentModalPayload | null) =>
    set((state) => ({
      isCreateEnvironmentModalOpen: !state.isCreateEnvironmentModalOpen,
      environmentModalPayload: payload,
    })),
  setUpdateEnvironmentModalOpen: (payload: EnvironmentModalPayload | null) =>
    set((state) => ({
      isUpdateEnvironmentModalOpen: !state.isUpdateEnvironmentModalOpen,
      environmentModalPayload: payload,
    })),
  setInviteMemberModalOpen: () =>
    set((state) => ({
      isInviteMemberModalOpen: !state.isInviteMemberModalOpen,
    })),
  setCreateProjectModalOpen: () =>
    set((state) => ({
      isCreateProjectModalOpen: !state.isCreateProjectModalOpen,
    })),
  setCreateFlagModalOpen: (payload: FlagModalPayload | null) =>
    set((state) => ({
      isCreateFlagModalOpen: !state.isCreateFlagModalOpen,
      flagModalPayload: payload,
    })),
  setUpdateFlagModalOpen: (payload: FlagModalPayload | null) =>
    set((state) => ({
      isUpdateFlagModalOpen: !state.isUpdateFlagModalOpen,
      flagModalPayload: payload,
    })),
});
