import React from "react";

export interface ModalsState {
  isDemoModalOpen: boolean;
}

export interface OpenDemoModalAction {
  type: "DEMO_MODAL_OPEN";
  payload: {
    isOpen: boolean;
  };
}



export type ModalsActions = OpenDemoModalAction;

export interface Context {
  state: ModalsState;
  dispatch: React.Dispatch<ModalsActions>;
}
