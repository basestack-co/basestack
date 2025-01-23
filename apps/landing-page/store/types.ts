/**
 * App
 */
export interface AppSliceActions {
  setDarkMode: (value: boolean) => void;
}

export interface AppSliceState extends AppSliceActions {
  isDarkMode: boolean;
}

export type Store = AppSliceState;
