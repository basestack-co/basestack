import {
  OpenCreateEnvironmentModalAction,
  OpenInviteMemberModalAction,
  OpenCreateProjectModalAction,
  OpenFlagModalAction,
  OpenFlagModalPayload,
} from "./types";

export const setIsCreateEnvironmentModalOpen = (
  isOpen: boolean
): OpenCreateEnvironmentModalAction => ({
  type: "CREATE_ENVIRONMENT_MODAL_OPEN",
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

export const setIsFlagModalOpen = (
  payload: OpenFlagModalPayload
): OpenFlagModalAction => ({
  type: "FLAG_MODAL_OPEN",
  payload,
});
