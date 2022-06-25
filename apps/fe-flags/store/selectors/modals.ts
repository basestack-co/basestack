// Store
import { RootState } from "store";
import { createSelector } from "@reduxjs/toolkit";
// Utils
import get from "lodash.get";

type Selector<T> = (state: RootState) => T;

export const getIsDemoModalOpen: Selector<boolean> = createSelector(
  (store: RootState) => get(store, "modals.isDemoModalOpen", false),
  (content) => content
);
