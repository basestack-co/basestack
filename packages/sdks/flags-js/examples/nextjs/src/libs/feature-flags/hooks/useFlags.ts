"use client";

import { useContext, useEffect, useState, useMemo } from "react";
// Feature Flags Context
import { FeatureFlagsContext } from "..";
// Note: Change to the correct dependency path
import { Flag } from "../../../../../../dist";

export const useFlags = () => {
  const context = useContext(FeatureFlagsContext);
  const [flags, setFlags] = useState<{ flags: Flag[] }>({
    flags: [],
  });
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (context?.isInitialized && context?.client) {
      if (context.flags.length > 0) {
        setFlags({ flags: context.flags });
      } else {
        context.client.getAllFlags().then(setFlags).catch(setError);
      }
    }
  }, [context]);

  if (!context) {
    throw new Error("useFlags must be used within a FeatureFlagsContext");
  }

  return useMemo(
    () => ({
      error,
      isInitialized: context.isInitialized,
      ...flags,
    }),
    [flags, context, error],
  );
};
