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

export const getIsCreateFlagModalOpen: Selector<boolean> = createSelector(
  (store: RootState) => get(store, "modals.isCreateFlagModalOpen", false),
  (content) => content
);

export const getIsInviteMemberModalOpen: Selector<boolean> = createSelector(
  (store: RootState) => get(store, "modals.isInviteMemberModalOpen", false),
  (content) => content
);

export const getIsCreateEnvironmentModalOpen: Selector<boolean> =
  createSelector(
    (store: RootState) =>
      get(store, "modals.isCreateEnvironmentModalOpen", false),
    (content) => content
  );
