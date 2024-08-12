import { ReactElement } from "react";
import { StateCreator } from "zustand/esm";
import { PersistOptions } from "zustand/middleware";

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

export interface ModalPayload<T> {
  isOpen: boolean;
  data?: T;
}

export type ModalAction<P, A> = (payload: P) => A;

export interface ModalsSliceActions {
  setCreateFormModalOpen: ModalAction<ModalPayload<null>, void>;
  setConfirmModalOpen: ModalAction<ModalPayload<ConfirmModalPayload>, void>;
}

export interface ModalsSliceState extends ModalsSliceActions {
  isCreateFormModalOpen: boolean;
  isConfirmModalOpen: boolean;
  confirmModalPayload: ConfirmModalPayload | null;
}

/**
 * App
 */

export interface AppSliceActions {
  setCloseModalsOnClickOutside: (value: boolean) => void;
  setDarkMode: (value: boolean) => void;
}

export interface AppSliceState extends AppSliceActions {
  closeModalsOnClickOutside: boolean;
  isDarkMode: boolean;
}

export type Store = ModalsSliceState & AppSliceState;
