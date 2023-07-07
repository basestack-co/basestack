import React, { createContext, useEffect, useReducer, useMemo } from "react";
// SDK
import FlagsJS from "@basestack/flags-js-sdk";

export type SdkType = typeof FlagsJS;

export interface ConfigParams {
  apiUrl: string;
  projectKey: string;
  envKey: string;
}

export interface State {
  sdk: SdkType | null;
}

export interface ContextState {
  state: State;
}

export interface ProviderProps extends ConfigParams {
  onSuccessfulInit?: (isInitialized: boolean) => void;
  children: React.ReactNode;
}

export type ReducerSetSdk = {
  type: "set-sdk";
  payload: {
    sdk: SdkType | null;
  };
};

export type ReducerActions = ReducerSetSdk;

export const Context = createContext<ContextState>({} as ContextState);

let reducer = (state: State, action: ReducerActions) => {
  switch (action.type) {
    case "set-sdk":
      return { ...state, ...action.payload };

    default:
      throw new Error(`Unhandled action type`);
  }
};

export const UpStampsProvider: React.FC<ProviderProps> = ({
  children,
  apiUrl,
  envKey,
  projectKey,
  onSuccessfulInit,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    sdk: null,
  });

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  // Initialize SDK on mount
  useEffect(() => {
    // Initialize SDK with provided values
    const initializeSdk = async () => {
      try {
        const sdk = new FlagsJS({
          apiUrl,
          projectKey,
          envKey,
        });

        // Initialize SDK
        await sdk.initialize();

        if (typeof onSuccessfulInit === "function") {
          onSuccessfulInit(true);
        }
      } catch (error) {
        if (typeof onSuccessfulInit === "function") {
          onSuccessfulInit(false);
        }
      }
    };

    initializeSdk();
  }, [apiUrl, projectKey, envKey, onSuccessfulInit]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
