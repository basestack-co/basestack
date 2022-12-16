import {
  OpenCreateEnvironmentModalAction,
  OpenInviteMemberModalAction,
  OpenCreateProjectModalAction,
  OpenUpdateEnvironmentModalAction,
  OpenCreateFlagModalAction,
  OpenUpdateFlagModalAction,
  OpenFlagModalPayload,
  OpenEnvironmentModalPayload,
} from "./types";

export const setIsCreateEnvironmentModalOpen = (
  payload: OpenEnvironmentModalPayload
): OpenCreateEnvironmentModalAction => ({
  type: "CREATE_ENVIRONMENT_MODAL_OPEN",
  payload,
});

export const setIsUpdateEnvironmentModalOpen = (
  payload: OpenEnvironmentModalPayload
): OpenUpdateEnvironmentModalAction => ({
  type: "UPDATE_ENVIRONMENT_MODAL_OPEN",
  payload,
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

export const setIsCreateFlagModalOpen = (
  payload: OpenFlagModalPayload
): OpenCreateFlagModalAction => ({
  type: "CREATE_FLAG_MODAL_OPEN",
  payload,
});

export const setIsUpdateFlagModalOpen = (
  payload: OpenFlagModalPayload
): OpenUpdateFlagModalAction => ({
  type: "UPDATE_FLAG_MODAL_OPEN",
  payload,
});
