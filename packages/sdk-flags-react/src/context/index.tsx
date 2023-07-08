import React, { createContext, useEffect, useMemo } from "react";
// Types
import { SDK } from "../types";

export interface ContextState {
  sdk: SDK;
}

export interface ProviderProps {
  onSuccessfulInit?: (isInitialized: boolean) => void;
  children: React.ReactNode;
  sdk: SDK;
}

export const FlagsContext = createContext<ContextState>({} as ContextState);

export const FlagsProvider: React.FC<ProviderProps> = ({
  children,
  onSuccessfulInit,
  sdk,
}) => {
  const value = useMemo(() => ({ sdk }), [sdk]);

  // Initialize SDK on mount
  useEffect(() => {
    // Initialize SDK with provided values
    const initializeSdk = async () => {
      try {
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
  }, [onSuccessfulInit, sdk]);

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
};
