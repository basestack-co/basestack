import { StateCreator } from "zustand/esm";
import { PersistOptions } from "zustand/middleware";
import { RouterOutput } from "../libs/trpc";

/**
 * Middleware
 */

export type Persist = (
  config: StateCreator<Store>,
  options: PersistOptions<Store>
) => StateCreator<Store>;

/**
 * Modals
 */

export interface FlagModalPayload {
  flagId: string;
  selectedTab: string;
  environment?: { id: string };
}

export interface EnvironmentModalPayload {
  environment?: { id: string };
  project: RouterOutput["project"]["bySlug"]["project"];
}

export interface ModalsSliceActions {
  setCreateEnvironmentModalOpen: (
    isOpen: boolean,
    payload: EnvironmentModalPayload | null
  ) => void;
  setUpdateEnvironmentModalOpen: (
    isOpen: boolean,
    payload: EnvironmentModalPayload | null
  ) => void;
  setInviteMemberModalOpen: (isOpen: boolean) => void;
  setCreateProjectModalOpen: (isOpen: boolean) => void;
  setCreateFlagModalOpen: (isOpen: boolean) => void;
  setUpdateFlagModalOpen: (
    isOpen: boolean,
    payload: FlagModalPayload | null
  ) => void;
}

export interface ModalsSliceState extends ModalsSliceActions {
  isCreateEnvironmentModalOpen: boolean;
  isUpdateEnvironmentModalOpen: boolean;
  isInviteMemberModalOpen: boolean;
  isCreateProjectModalOpen: boolean;
  isCreateFlagModalOpen: boolean;
  isUpdateFlagModalOpen: boolean;
  flagModalPayload: FlagModalPayload | null;
  environmentModalPayload: EnvironmentModalPayload | null;
}

/**
 * App
 */

export interface AppSliceActions {
  setDarkMode: () => void;
}

export interface AppSliceState extends AppSliceActions {
  isDarkMode: boolean;
}

export type Store = ModalsSliceState & AppSliceState;
