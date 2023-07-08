import { useEffect, useState } from "react";
// Context
import { useFlagsContext } from "./useFlagsContext";
// Types
import { Flag, FlagNotFoundError } from "../types";

const useFlagAsync = (name: string) => {
  const { sdk } = useFlagsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState<Flag | FlagNotFoundError | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const flag = await sdk.flagAsync(name);
        setFlag(flag);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlag();
  }, [name, sdk]);

  return { isLoading, error, flag } as const;
};

export default useFlagAsync;
