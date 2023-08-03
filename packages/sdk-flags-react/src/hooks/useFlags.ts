import { useMemo } from "react";
// Context
import { useFlagsContext } from "./useFlagsContext";
// Types
import { Flag } from "../types";

const useFlags = (): Flag[] => {
  const { sdk, isInitialized } = useFlagsContext();

  return useMemo(() => {
    if (!isInitialized) {
      return [];
    }

    return sdk.flags();
  }, [sdk, isInitialized]);
};

export default useFlags;
