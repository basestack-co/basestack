import { useEffect, useState } from "react";
// Types
import type { Flag } from "@basestack/flags-js-sdk";
// Context
import { useFlagsContext } from "./useFlagsContext";

const useFlagsAsync = () => {
  const { sdk } = useFlagsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [flags, setFlags] = useState<Flag[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const flags = await sdk.flagsAsync();
        setFlags(flags);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlag();
  }, [sdk]);

  return { isLoading, error, flags } as const;
};

export default useFlagsAsync;
