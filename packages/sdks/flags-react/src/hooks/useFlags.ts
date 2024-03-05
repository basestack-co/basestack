// Types
import type { Flag } from "../types";
// Context
import { useFlagsContext } from "./useFlagsContext";

const useFlags = (): Flag[] => {
  const { sdk, isInitialized } = useFlagsContext();

  if (!isInitialized) {
    return [];
  }

  return sdk.flags();
};

export default useFlags;
