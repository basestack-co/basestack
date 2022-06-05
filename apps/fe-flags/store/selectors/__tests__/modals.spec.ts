// Store
import { initialState } from "store";
// Selectors
import {
  getIsDemoModalOpen,
  getIsCreateFlagModalOpen,
  getIsInviteMemberModalOpen,
  getIsCreateEnvironmentModalOpen,
} from "../modals";

describe("Modals Selectors Tests", () => {
  test("should test getIsDemoModalOpen", () => {
    expect(getIsDemoModalOpen(initialState)).toBe(false);
  });

  test("should test getIsCreateFlagModalOpen", () => {
    expect(getIsCreateFlagModalOpen(initialState)).toBe(false);
  });

  test("should test getIsInviteMemberModalOpen", () => {
    expect(getIsInviteMemberModalOpen(initialState)).toBe(false);
  });

  test("should test getIsCreateEnvironmentModalOpen", () => {
    expect(getIsCreateEnvironmentModalOpen(initialState)).toBe(false);
  });
});
