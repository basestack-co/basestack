import { StateCreator } from "zustand/esm";
import { PersistOptions } from "zustand/middleware";
import { TabType, SelectedView } from "types/flags";
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
  flag: { id: string; slug: string };
  selectedTab: TabType;
  environment?: { id: string };
}

export interface EnvironmentModalPayload {
  environment?: { id: string };
  project: RouterOutput["project"]["bySlug"]["project"];
}

export interface ModalPayload<T> {
  isOpen: boolean;
  data?: T;
}

export type ModalAction<P, A> = (payload: P) => A;

export interface ModalsSliceActions {
  setCreateEnvironmentModalOpen: ModalAction<
    ModalPayload<EnvironmentModalPayload>,
    void
  >;
  setUpdateEnvironmentModalOpen: ModalAction<
    ModalPayload<EnvironmentModalPayload>,
    void
  >;
  setInviteMemberModalOpen: ModalAction<ModalPayload<null>, void>;
  setCreateProjectModalOpen: ModalAction<ModalPayload<null>, void>;
  setCreateFlagModalOpen: ModalAction<ModalPayload<null>, void>;
  setUpdateFlagModalOpen: ModalAction<ModalPayload<FlagModalPayload>, void>;
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
  setSelectedView: (payload: { view: SelectedView }) => void;
}

export interface AppSliceState extends AppSliceActions {
  isDarkMode: boolean;
  selectedView: SelectedView;
}

export type Store = ModalsSliceState & AppSliceState;