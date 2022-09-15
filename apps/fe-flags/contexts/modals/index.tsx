import React, { createContext, useReducer, useMemo } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "./types";

export const initialState: ModalsState = {
  isDemoModalOpen: false,
  isCreateEnvironmentModalOpen: false,
  isInviteMemberModalOpen: false,
  isCreateProjectModalOpen: false,
  isFlagModalOpen: false,
  flagModalPayload: {
    isEdit: true,
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

    case "FLAG_MODAL_OPEN":
      return {
        ...state,
        isFlagModalOpen: action.payload.isOpen,
        flagModalPayload: {
          isEdit: action.payload.isEdit,
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
