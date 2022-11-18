import {
  OpenCreateEnvironmentModalAction,
  OpenInviteMemberModalAction,
  OpenCreateProjectModalAction,
  OpenEditEnvironmentModalAction,
  OpenFlagModalAction,
  OpenFlagModalPayload,
  OpenEnvironmentModalPayload,
} from "./types";

export const setIsCreateEnvironmentModalOpen = (
  payload: OpenEnvironmentModalPayload
): OpenCreateEnvironmentModalAction => ({
  type: "CREATE_ENVIRONMENT_MODAL_OPEN",
  payload,
});

export const setIsEditEnvironmentModalOpen = (
  payload: OpenEnvironmentModalPayload
): OpenEditEnvironmentModalAction => ({
  type: "EDIT_ENVIRONMENT_MODAL_OPEN",
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

export const setIsFlagModalOpen = (
  payload: OpenFlagModalPayload
): OpenFlagModalAction => ({
  type: "FLAG_MODAL_OPEN",
  payload,
});
