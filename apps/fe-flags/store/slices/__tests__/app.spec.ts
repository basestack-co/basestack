import { AnyAction } from "@reduxjs/toolkit";
import appReducer, { setIsNavCollapsed, initialState } from "../app";

describe("appSlice tests", () => {
  describe("reducers", () => {
    it("returns initial state", () => {
      const nextState = appReducer(undefined, {} as AnyAction);
      expect(nextState).toEqual(initialState);
    });
  });
});
