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

export const getIsCreateFlagModalOpen = createSelector(
  (store: RootState) => get(store, "modals.isCreateFlagModalOpen", false),
  (content) => content
);

export const getIsInviteMemberModalOpen = createSelector(
  (store: RootState) => get(store, "modals.isInviteMemberModalOpen", false),
  (content) => content
);

export const getIsCreateEnvironmentModalOpen = createSelector(
  (store: RootState) =>
    get(store, "modals.isCreateEnvironmentModalOpen", false),
  (content) => content
);
