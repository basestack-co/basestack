import { useMemo } from "react";
// Context
import { useFlagsContext } from "./useFlagsContext";
// Types
import { FlagResult, Flag } from "../types";

const useFlag = (name: string): FlagResult<Flag | null> => {
  const { sdk, isInitialized } = useFlagsContext();

  return useMemo(() => {
    if (!isInitialized) {
      return {
        enabled: false,
        error: true,
        message: `SDK is not initialized`,
      };
    }

    return sdk.flag(name);
  }, [sdk, name, isInitialized]);
};

export default useFlag;
