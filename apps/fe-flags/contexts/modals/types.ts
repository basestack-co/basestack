import React from "react";

export interface ModalsState {
  isDemoModalOpen: boolean;
  isCreateEnvironmentModalOpen: boolean;
  isCreateFlagModalOpen: boolean;
  isInviteMemberModalOpen: boolean;
}

export interface OpenDemoModalAction {
  type: "DEMO_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenCreateEnvironmentModalAction {
  type: "CREATE_ENVIRONMENT_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenCreateFlagModalAction {
  type: "CREATE_FLAG_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export interface OpenInviteMemberModalAction {
  type: "INVITE_MEMBER_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}

export type ModalsActions =
  | OpenDemoModalAction
  | OpenCreateEnvironmentModalAction
  | OpenCreateFlagModalAction
  | OpenInviteMemberModalAction;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
