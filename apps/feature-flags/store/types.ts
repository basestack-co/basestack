import { ReactElement } from "react";
import { StateCreator } from "zustand";
import { PersistOptions } from "zustand/middleware";
import { TabType, SelectedView } from "types";

/**
 * Middleware
 */

export type Persist = (
  config: StateCreator<Store>,
  options: PersistOptions<Store>,
) => StateCreator<Store>;

/**
 * Modals
 */

export type ConfirmModalType = "delete" | "info";

export interface ConfirmModalPayload {
  type?: ConfirmModalType;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  children?: ReactElement;
}

export interface FlagModalPayload {
  flag: { id: string; slug: string };
  selectedTab: TabType;
  environment?: { id: string };
}

export interface EnvironmentModalPayload {
  environment?: { id: string };
}

export interface ModalPayload<T> {
  isOpen: boolean;
  data?: T;
}

export interface TeamModalPayload {
  id: string;
  name: string;
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
  setAddProjectMemberModalOpen: ModalAction<ModalPayload<null>, void>;
  setCreateProjectModalOpen: ModalAction<ModalPayload<null>, void>;
  setCreateTeamModalOpen: ModalAction<ModalPayload<null>, void>;
  setManageTeamModalOpen: ModalAction<ModalPayload<TeamModalPayload>, void>;
  setCreateFlagModalOpen: ModalAction<ModalPayload<null>, void>;
  setUpdateFlagModalOpen: ModalAction<ModalPayload<FlagModalPayload>, void>;
  setConfirmModalOpen: ModalAction<ModalPayload<ConfirmModalPayload>, void>;
  setIntegrationModalOpen: ModalAction<ModalPayload<null>, void>;
  setActivityModalOpen: ModalAction<ModalPayload<null>, void>;
}

export interface ModalsSliceState extends ModalsSliceActions {
  isCreateEnvironmentModalOpen: boolean;
  isUpdateEnvironmentModalOpen: boolean;
  isAddProjectMemberModalOpen: boolean;
  isCreateProjectModalOpen: boolean;
  isCreateTeamModalOpen: boolean;
  isManageTeamModalOpen: boolean;
  isCreateFlagModalOpen: boolean;
  isUpdateFlagModalOpen: boolean;
  flagModalPayload: FlagModalPayload | null;
  environmentModalPayload: EnvironmentModalPayload | null;
  teamModalPayload: TeamModalPayload | null;
  isConfirmModalOpen: boolean;
  confirmModalPayload: ConfirmModalPayload | null;
  isIntegrationModalOpen: boolean;
  isActivityModalOpen: boolean;
}

/**
 * App
 */

export interface AppSliceActions {
  setNumberOfFlagsPerPage: (value: number) => void;
  setCloseModalsOnClickOutside: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setSelectedView: (payload: { view: SelectedView }) => void;
  setCloseNoActiveSubscriptionBanner: (value: boolean) => void;
}

export interface AppSliceState extends AppSliceActions {
  numberOfFlagsPerPage: number;
  closeModalsOnClickOutside: boolean;
  isDarkMode: boolean;
  selectedView: SelectedView;
  closeNoActiveSubscriptionBanner: boolean;
}

export type Store = ModalsSliceState & AppSliceState;
