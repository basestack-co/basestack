// Types
import { Flag } from "@basestack/flags-js-sdk";
// Context
import { useFlagsContext } from "./useFlagsContext";

const useFlags = (): Flag[] => {
  const { sdk } = useFlagsContext();

  if (!sdk.isInitialized) {
    return [];
  }

  return sdk.flags();
};

export default useFlags;
