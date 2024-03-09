import React, { createContext, useEffect, useMemo, useState } from "react";
// Types
import type { SDKType } from "../types";

export interface ContextState {
  sdk: SDKType;
  isInitialized: boolean;
}

export interface ProviderProps {
  onSuccessfulInit?: (isInitialized: boolean) => void;
  children: React.ReactNode;
  sdk: SDKType;
}

export const FlagsContext = createContext<ContextState | undefined>(undefined);

export const FlagsProvider: React.FC<ProviderProps> = ({
  children,
  onSuccessfulInit,
  sdk,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const value = useMemo(() => ({ sdk, isInitialized }), [sdk, isInitialized]);

  // Initialize SDK on mount
  useEffect(() => {
    // Initialize SDK with provided values
    const initializeSdk = async () => {
      try {
        // Initialize SDK
        const isInit = await sdk.initialize();

        if (isInit) {
          if (onSuccessfulInit) onSuccessfulInit(true);
          setIsInitialized(true);
        }
      } catch (error) {
        if (onSuccessfulInit) onSuccessfulInit(false);
      }
    };

    initializeSdk();
  }, [onSuccessfulInit, sdk]);

  return (
    <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
  );
};
