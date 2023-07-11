import { useMemo } from "react";
// Context
import { useFlagsContext } from "./useFlagsContext";
// Types
import { Flag } from "../types";

const useFlags = (): Flag[] => {
  const { sdk } = useFlagsContext();

  return useMemo(() => {
    if (!sdk.isInitialized) {
      return [];
    }

    return sdk.flags();
  }, [sdk]);
};

export default useFlags;
