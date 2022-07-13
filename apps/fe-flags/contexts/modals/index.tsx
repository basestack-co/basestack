import React, { createContext, useReducer, useMemo } from "react";
// Types
import { ModalsState, ModalsActions, Context } from "./types";

export const initialState: ModalsState = {
  isDemoModalOpen: false,
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
    case "DEMO_MODAL_OPEN":
      return {
        ...state,
        isDemoModalOpen: action.payload.isOpen,
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
