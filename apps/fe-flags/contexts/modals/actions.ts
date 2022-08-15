import {
  OpenDemoModalAction,
  OpenCreateEnvironmentModalAction,
  OpenCreateFlagModalAction,
  OpenInviteMemberModalAction,
  OpenCreateProjectModalAction,
  EditCreateFlagModalAction,
} from "./types";

export const setIsDemoModalOpen = (isOpen: boolean): OpenDemoModalAction => ({
  type: "DEMO_MODAL_OPEN",
  payload: { isOpen },
});

export const setIsCreateEnvironmentModalOpen = (
  isOpen: boolean
): OpenCreateEnvironmentModalAction => ({
  type: "CREATE_ENVIRONMENT_MODAL_OPEN",
  payload: { isOpen },
});

export const seIstCreateFlagModalOpen = (
  isOpen: boolean
): OpenCreateFlagModalAction => ({
  type: "CREATE_FLAG_MODAL_OPEN",
  payload: { isOpen },
});

export const seIsInviteMemberModalOpen = (
  isOpen: boolean
): OpenInviteMemberModalAction => ({
  type: "INVITE_MEMBER_MODAL_OPEN",
  payload: { isOpen },
});

export const seIsCreateProjectModalOpen = (
  isOpen: boolean
): OpenCreateProjectModalAction => ({
  type: "CREATE_PROJECT_MODAL_OPEN",
  payload: { isOpen },
});

export const setIstEditFlagModalOpen = (
  isOpen: boolean
): EditCreateFlagModalAction => ({
  type: "EDIT_FLAG_MODAL_OPEN",
  payload: { isOpen },
});
