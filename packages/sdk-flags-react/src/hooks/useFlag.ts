// Types
import type { Flag } from "@basestack/flags-js-sdk";
// Context
import { useFlagsContext } from "./useFlagsContext";

const useFlag = (name: string): Flag => {
  const { sdk, isInitialized } = useFlagsContext();

  if (!isInitialized) {
    return {
      enabled: false,
      error: true,
      description: `SDK is not initialized`,
      slug: "",
    };
  }

  return sdk.flag(name);
};

export default useFlag;
