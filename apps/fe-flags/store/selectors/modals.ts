// Store
import { RootState } from "store";
import { createSelector } from "@reduxjs/toolkit";
// Utils
import get from "lodash.get";

export const getIsDemoModalOpen = createSelector(
  (store: RootState) => get(store, "modals.isDemoModalOpen", false),
  (content) => content
);
