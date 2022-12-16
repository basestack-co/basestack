import React from "react";
import { RouterOutput } from "libs/trpc";

export interface OpenFlagModalPayload {
  isOpen: boolean;
  data?: {
    flagId: string;
    selectedTab: string;
    environment?: { id: string };
  } | null;
}

export interface OpenEnvironmentModalPayload {
  isOpen: boolean;
  data: {
    environment?: { id: string };
    project: RouterOutput["project"]["bySlug"]["project"];
  } | null;
}

export interface ModalsState {
  isDemoModalOpen: boolean;
  isCreateEnvironmentModalOpen: boolean;
  isUpdateEnvironmentModalOpen: boolean;
  isInviteMemberModalOpen: boolean;
  isCreateProjectModalOpen: boolean;
  isCreateFlagModalOpen: boolean;
  isUpdateFlagModalOpen: boolean;
  flagModalPayload: Pick<OpenFlagModalPayload, "data">;
  environmentModalPayload: Pick<OpenEnvironmentModalPayload, "data">;
}

export interface OpenDemoModalAction {
  type: "DEMO_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenCreateEnvironmentModalAction {
  type: "CREATE_ENVIRONMENT_MODAL_OPEN";
  payload: OpenEnvironmentModalPayload;
}

export interface OpenUpdateEnvironmentModalAction {
  type: "UPDATE_ENVIRONMENT_MODAL_OPEN";
  payload: OpenEnvironmentModalPayload;
}

export interface OpenInviteMemberModalAction {
  type: "INVITE_MEMBER_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenCreateProjectModalAction {
  type: "CREATE_PROJECT_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenCreateFlagModalAction {
  type: "CREATE_FLAG_MODAL_OPEN";
  payload: OpenFlagModalPayload;
}

export interface OpenUpdateFlagModalAction {
  type: "UPDATE_FLAG_MODAL_OPEN";
  payload: OpenFlagModalPayload;
}

export type ModalsActions =
  | OpenDemoModalAction
  | OpenCreateEnvironmentModalAction
  | OpenUpdateEnvironmentModalAction
  | OpenInviteMemberModalAction
  | OpenCreateProjectModalAction
  | OpenCreateFlagModalAction
  | OpenUpdateFlagModalAction;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
