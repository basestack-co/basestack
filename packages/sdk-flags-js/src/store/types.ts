import { StateCreator } from "zustand/esm";
import { PersistOptions } from "zustand/middleware";
import { Flag } from "../types";

/**
 * Middleware
 */

export type Persist = (
  config: StateCreator<Store>,
  options: PersistOptions<Store>,
) => StateCreator<Store>;

/**
 * SDK
 */

export interface SdkSliceActions {
  setVersion: (payload: string) => void;
  setIsInitialized: (payload: boolean) => void;
}

export interface SdkSliceState extends SdkSliceActions {
  version: string;
  isInitialized: boolean;
}

/**
 * Flags
 */

export interface FlagsSliceActions {
  setFlags: (payload: Flag[]) => void;
}

export interface FlagsSliceState extends FlagsSliceActions {
  flags: Flag[];
}

export type Store = SdkSliceState & FlagsSliceState;
