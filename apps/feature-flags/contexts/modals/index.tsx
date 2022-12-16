import React, { createContext, useReducer, useMemo } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "./types";

export const initialState: ModalsState = {
  isDemoModalOpen: false,
  isCreateEnvironmentModalOpen: false,
  isUpdateEnvironmentModalOpen: false,
  isInviteMemberModalOpen: false,
  isCreateProjectModalOpen: false,
  isCreateFlagModalOpen: false,
  isUpdateFlagModalOpen: false,
  environmentModalPayload: { data: null },
  flagModalPayload: {
    data: null,
  },
};

export const ModalsContext = createContext<Context>({
  state: initialState,
  dispatch: () => null,
});

export const Reducer = (
  state: ModalsState,
  action: ModalsActions
): ModalsState => {
  switch (action.type) {
    case "CREATE_ENVIRONMENT_MODAL_OPEN":
      return {
        ...state,
        isCreateEnvironmentModalOpen: action.payload.isOpen,
        environmentModalPayload: {
          data: action.payload.data,
        },
      };

    case "UPDATE_ENVIRONMENT_MODAL_OPEN":
      return {
        ...state,
        isUpdateEnvironmentModalOpen: action.payload.isOpen,
        environmentModalPayload: {
          data: action.payload.data,
        },
      };

    case "INVITE_MEMBER_MODAL_OPEN":
      return {
        ...state,
        isInviteMemberModalOpen: action.payload.isOpen,
      };

    case "CREATE_PROJECT_MODAL_OPEN":
      return {
        ...state,
        isCreateProjectModalOpen: action.payload.isOpen,
      };

    case "CREATE_FLAG_MODAL_OPEN":
      return {
        ...state,
        isCreateFlagModalOpen: action.payload.isOpen,
        flagModalPayload: {
          data: action.payload.data,
        },
      };

    case "UPDATE_FLAG_MODAL_OPEN":
      return {
        ...state,
        isUpdateFlagModalOpen: action.payload.isOpen,
        flagModalPayload: {
          data: action.payload.data,
        },
      };

    default:
      return state;
  }
};

export const ModalsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <ModalsContext.Provider value={values}>{children}</ModalsContext.Provider>
  );
};
