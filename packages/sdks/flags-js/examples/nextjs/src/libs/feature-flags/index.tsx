"use client";

import React, { createContext, useEffect, useMemo, useState } from "react";
// Note: Change to the correct dependency path
import { Flag, FlagsSDK, SDKConfig } from "../../../../../dist";

interface ContextState {
  client: FlagsSDK;
  isInitialized: boolean;
  flags: Flag[];
  error?: Error;
}

interface ProviderProps {
  children: React.ReactNode;
  config: SDKConfig;
  onSuccessfulInit?: (success: boolean) => void;
}

export const createFlagsClient = (config: SDKConfig) => {
  return new FlagsSDK({
    baseURL: config.baseURL,
    projectKey: config.projectKey,
    environmentKey: config.environmentKey,
  });
};

export const FeatureFlagsContext = createContext<ContextState | undefined>(
  undefined,
);

const FeatureFlagsProvider: React.FC<ProviderProps> = ({
  children,
  config,
  onSuccessfulInit,
}) => {
  const [state, setState] = useState<Omit<ContextState, "client">>({
    isInitialized: false,
    flags: [],
  });
  const client = useMemo(() => createFlagsClient(config), [config]);
  const value = useMemo(() => ({ ...state, client }), [state, client]);

  useEffect(() => {
    let isMounted = true;

    const initializeFlags = async () => {
      try {
        const response = await client.getAllFlags();

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
  }, [client, onSuccessfulInit]);

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export default FeatureFlagsProvider;
