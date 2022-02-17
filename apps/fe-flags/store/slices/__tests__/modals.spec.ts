import { AnyAction } from "@reduxjs/toolkit";
import modalsReducer, { setDemoModalOpen, initialState } from "../modals";

describe("modalsReducer tests", () => {
  describe("reducers", () => {
    it("returns initial state", () => {
      const nextState = modalsReducer(undefined, {} as AnyAction);
      expect(nextState).toEqual(initialState);
    });

    it("setCalendarEventModalOpen", () => {
      const nextState = modalsReducer(initialState, setDemoModalOpen(true));
      expect(nextState.isDemoModalOpen).toEqual(true);
    });
  });
});
