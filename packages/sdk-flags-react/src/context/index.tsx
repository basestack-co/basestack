import React, { createContext, useEffect, useMemo, useState } from "react";
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

export const FlagsContext = createContext<ContextState>({} as ContextState);

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
