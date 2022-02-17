import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  isNavCollapsed: boolean;
}

export const initialState: AppState = {
  isNavCollapsed: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsNavCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isNavCollapsed = action.payload;
    },
  },
});

export const { setIsNavCollapsed } = appSlice.actions;

export default appSlice.reducer;
