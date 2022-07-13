import { OpenDemoModalAction } from "./types";

export const setIsDemoModalOpen = (isOpen: boolean): OpenDemoModalAction => ({
  type: "DEMO_MODAL_OPEN",
  payload: { isOpen },
});
