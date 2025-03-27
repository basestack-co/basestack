/**
 * App
 */
export interface AppSliceActions {
  setDarkMode: (value: boolean) => void;
  setStargazers: (value: number) => void;
}

export interface AppSliceState extends AppSliceActions {
  isDarkMode: boolean;
  stargazers: number;
}

export type Store = AppSliceState;
