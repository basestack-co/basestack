import type { ReactElement } from "react";

/**
 * Modals
 */

export interface TeamModalPayload {
  id: string;
  name: string;
}

export type ConfirmModalType = "delete" | "info";

export interface ConfirmModalPayload {
  type?: ConfirmModalType;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  children?: ReactElement;
}

export interface ModalPayload<T> {
  isOpen: boolean;
  data?: T;
}

export type ModalAction<P, A> = (payload: P) => A;

export interface ModalsSliceActions {
  setCreateFormModalOpen: ModalAction<ModalPayload<null>, void>;
  setConfirmModalOpen: ModalAction<ModalPayload<ConfirmModalPayload>, void>;
  setAddFormMemberModalOpen: ModalAction<ModalPayload<null>, void>;
  setCreateTeamModalOpen: ModalAction<ModalPayload<null>, void>;
  setManageTeamModalOpen: ModalAction<ModalPayload<TeamModalPayload>, void>;
}

export interface ModalsSliceState extends ModalsSliceActions {
  isCreateFormModalOpen: boolean;
  isConfirmModalOpen: boolean;
  confirmModalPayload: ConfirmModalPayload | null;
  isAddFormMemberModalOpen: boolean;
  isCreateTeamModalOpen: boolean;
  isManageTeamModalOpen: boolean;
  teamModalPayload: TeamModalPayload | null;
}

/**
 * App
 */

export interface AppSliceActions {
  setCloseModalsOnClickOutside: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
  setCloseNoActiveSubscriptionBanner: (value: boolean) => void;
}

export interface AppSliceState extends AppSliceActions {
  closeModalsOnClickOutside: boolean;
  closeNoActiveSubscriptionBanner: boolean;
  isDarkMode: boolean;
}

export type Store = ModalsSliceState & AppSliceState;
