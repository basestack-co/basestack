import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalsState {
  isDemoModalOpen: boolean;
  isCreateFlagModalOpen: boolean;
  isInviteMemberModalOpen: boolean;
  isCreateEnvironmentModalOpen: boolean;
}

export const initialState: ModalsState = {
  isDemoModalOpen: false,
  isCreateFlagModalOpen: false,
  isInviteMemberModalOpen: false,
  isCreateEnvironmentModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setDemoModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDemoModalOpen = action.payload;
    },
    setCreateFlagModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateFlagModalOpen = action.payload;
    },
    setInviteMemberModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isInviteMemberModalOpen = action.payload;
    },
    setCreateEnvironmentModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateEnvironmentModalOpen = action.payload;
    },
  },
});

export const {
  setDemoModalOpen,
  setCreateFlagModalOpen,
  setInviteMemberModalOpen,
  setCreateEnvironmentModalOpen,
} = modalsSlice.actions;

export default modalsSlice.reducer;
