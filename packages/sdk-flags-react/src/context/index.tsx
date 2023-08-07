import React, { createContext, useEffect, useMemo } from "react";
// Types
import FlagsJS from "@basestack/flags-js-sdk";

export interface ContextState {
  sdk: FlagsJS;
}

export interface ProviderProps {
  onSuccessfulInit?: (isInitialized: boolean) => void;
  children: React.ReactNode;
  sdk: FlagsJS;
}

export const FlagsContext = createContext<ContextState | undefined>(undefined);

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
        if (onSuccessfulInit) onSuccessfulInit(true);
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
