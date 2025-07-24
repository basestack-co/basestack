"use client";

import { useContext, useEffect, useMemo, useState } from "react";
// Feature Flags Context
import { FeatureFlagsContext } from "@/libs/feature-flags";
// Note: Change to the correct dependency path
import { Flag } from "../../../../../../dist";

interface FlagsState {
  flags: Flag[];
}

interface UseFlagsResult extends FlagsState {
  error: Error | null;
  isInitialized: boolean;
}

export const useFlags = (): UseFlagsResult => {
  const context = useContext(FeatureFlagsContext);
  const [{ flags }, setFlags] = useState<FlagsState>({ flags: [] });
  const [error, setError] = useState<Error | null>(null);

  if (!context) {
    throw new Error("useFlags must be used within a FeatureFlagsContext");
  }

  useEffect(() => {
    if (!context.isInitialized || !context.client) return;

    if (context.flags.length > 0) {
      setFlags({ flags: context.flags });
      return;
    }

    context.client
      .getAllFlags()
      .then((result) => setFlags(result))
      .catch((err) =>
        setError(err instanceof Error ? err : new Error(String(err))),
      );

    return () => {};
  }, [
    context.isInitialized,
    context.client,
    context.flags.length,
    context.flags,
  ]);

  return useMemo(
    () => ({
      error,
      isInitialized: context.isInitialized,
      flags,
    }),
    [flags, context.isInitialized, error],
  );
};
