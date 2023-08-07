// Types
import { FlagResult, Flag } from "@basestack/flags-js-sdk";
// Context
import { useFlagsContext } from "./useFlagsContext";

const useFlag = (name: string): FlagResult<Flag | null> => {
  const { sdk } = useFlagsContext();

  if (!sdk.isInitialized) {
    return {
      enabled: false,
      error: true,
      message: `SDK is not initialized`,
    };
  }

  return sdk.flag(name);
};

export default useFlag;
