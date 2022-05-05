// Store
import { initialState } from "store";
// Selectors
import { getIsDemoModalOpen } from "../modals";

describe("Modals Selectors Tests", () => {
  it("should test getIsDemoModalOpen", () => {
    expect(getIsDemoModalOpen(initialState)).toBe(false);
  });
});
