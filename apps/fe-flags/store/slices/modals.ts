import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalsState {
  isDemoModalOpen: boolean;
}

export const initialState: ModalsState = {
  isDemoModalOpen: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setDemoModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isDemoModalOpen = action.payload;
    },
  },
});

export const { setDemoModalOpen } = modalsSlice.actions;

export default modalsSlice.reducer;
