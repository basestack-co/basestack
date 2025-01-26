"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
// Note: Change to the correct dependency path
import { FlagsSDK, Flag, SDKConfig } from "../../../../../dist";

interface ContextState {
  client: FlagsSDK;
  isInitialized: boolean;
  flags: Flag[];
  error?: Error;
}

interface ProviderProps {
  children: React.ReactNode;
  onSuccessfulInit?: (success: boolean) => void;
}

export const createFlagsClient = (config: SDKConfig) => {
  return new FlagsSDK({
    baseURL: config.baseURL,
    projectKey: config.projectKey,
    environmentKey: config.environmentKey,
  });
};

// Change the baseURL, projectKey, and environmentKey to match your project
export const flagsClient = new FlagsSDK({
  baseURL: process.env.NEXT_PUBLIC_FEATURE_FLAGS_BASE_URL,
  projectKey: process.env.NEXT_PUBLIC_FEATURE_FLAGS_PROJECT_KEY!,
  environmentKey: process.env.NEXT_PUBLIC_FEATURE_FLAGS_ENVIRONMENT_KEY!,
});

export const FeatureFlagsContext = createContext<ContextState | undefined>(
  undefined,
);

const FeatureFlagsProvider: React.FC<ProviderProps> = ({
  children,
  onSuccessfulInit,
}) => {
  const [state, setState] = useState<Omit<ContextState, "client">>({
    isInitialized: false,
    flags: [],
  });

  const value = useMemo(
    () => ({ ...state, client: flagsClient }),
    [state, flagsClient],
  );

  useEffect(() => {
    let isMounted = true;

    const initializeFlags = async () => {
      try {
        const response = await flagsClient.getAllFlags();

        if (isMounted) {
          setState((prev) => ({
            ...prev,
            flags: response.flags ?? [],
            isInitialized: true,
          }));
          onSuccessfulInit?.(true);
        }
      } catch (error) {
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            error: error as Error,
            isInitialized: true,
          }));
          onSuccessfulInit?.(false);
        }
      }
    };

    initializeFlags();

    return () => {
      isMounted = false;
    };
  }, [flagsClient, onSuccessfulInit]);

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export default FeatureFlagsProvider;
