import { AnyAction } from "@reduxjs/toolkit";
import modalsReducer, {
  setCreateFlagModalOpen,
  setDemoModalOpen,
  setInviteMemberModalOpen,
  setCreateEnvironmentModalOpen,
  initialState,
} from "../modals";

describe("modalsReducer tests", () => {
  describe("reducers", () => {
    test("returns initial state", () => {
      const nextState = modalsReducer(undefined, {} as AnyAction);
      expect(nextState).toEqual(initialState);
    });

    test("setCalendarEventModalOpen", () => {
      const nextState = modalsReducer(initialState, setDemoModalOpen(true));
      expect(nextState.isDemoModalOpen).toEqual(true);
    });

    test("setCreateFlagModalOpen", () => {
      const nextState = modalsReducer(
        initialState,
        setCreateFlagModalOpen(true)
      );
      expect(nextState.isCreateFlagModalOpen).toEqual(true);
    });

    test("setInviteMemberModalOpen", () => {
      const nextState = modalsReducer(
        initialState,
        setInviteMemberModalOpen(true)
      );
      expect(nextState.isInviteMemberModalOpen).toEqual(true);
    });

    test("setCreateEnvironmentModalOpen", () => {
      const nextState = modalsReducer(
        initialState,
        setCreateEnvironmentModalOpen(true)
      );
      expect(nextState.isCreateEnvironmentModalOpen).toEqual(true);
    });
  });
});
