import { useMemo } from "react";
// Context
import { useFlagsContext } from "./useFlagsContext";
// Types
import { FlagResult, Flag } from "../types";

const useFlag = (name: string): FlagResult<Flag | null> => {
  const { sdk } = useFlagsContext();

  return useMemo(() => {
    if (!sdk.isInitialized) {
      return {
        enabled: false,
        error: true,
        message: `SDK is not initialized`,
      };
    }

    return sdk.flag(name);
  }, [sdk, name]);
};

export default useFlag;
