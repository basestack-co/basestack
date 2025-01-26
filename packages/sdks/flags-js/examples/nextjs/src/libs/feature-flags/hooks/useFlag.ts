"use client";

import { useContext, useEffect, useState, useMemo } from "react";
// Feature Flags Context
import { FeatureFlagsContext } from "@/libs/feature-flags";
// Note: Change to the correct dependency path
import { Flag } from "../../../../../../dist";

export const useFlag = <P = Record<string, unknown>>(slug: string) => {
  const context = useContext(FeatureFlagsContext);
  const [flag, setFlag] = useState<Flag | null>(null);
  const [error, setError] = useState<Error | null>(null);

  if (!context) {
    throw new Error("useFlag must be used within a FeatureFlagsContext");
  }

  useEffect(() => {
    let isMounted = true;

    const fetchFlag = async () => {
      if (!context.isInitialized || !context.client) return;

      try {
        if (context.flags.length > 0) {
          const foundFlag = context.flags.find((f) => f.slug === slug);
          if (foundFlag) {
            isMounted && setFlag(foundFlag);
          } else {
            isMounted && setError(new Error(`Flag "${slug}" not found`));
          }
        } else {
          const fetchedFlag = await context.client.getFlag(slug);
          isMounted && setFlag(fetchedFlag);
        }
      } catch (err) {
        isMounted &&
          setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    fetchFlag();

    return () => {
      isMounted = false;
    };
  }, [context.isInitialized, context.client, context.flags, slug]);

  return useMemo(
    () => ({
      ...flag,
      error,
      isInitialized: context.isInitialized,
      payload: (flag?.payload as P) ?? null,
    }),
    [error, context.isInitialized, flag],
  );
};
