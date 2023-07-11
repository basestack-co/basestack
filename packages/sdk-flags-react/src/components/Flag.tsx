import React, { useMemo, Fragment } from "react";
// Context
import { useFlagsContext } from "../hooks/useFlagsContext";
// Types
import { FlagResult, Flag } from "../types";

export interface Props {
  children?: React.ReactNode;
  name: string;
  render?: (flag: FlagResult<Flag | null>) => React.ReactNode;
}
const Flag = ({ name, render, children }: Props) => {
  const { sdk } = useFlagsContext();

  const flag: FlagResult<Flag | null> = useMemo(() => {
    if (!sdk.isInitialized) {
      return {
        enabled: false,
        error: true,
        message: "SDK is not initialized",
      };
    }

    return sdk.flag(name);
  }, [sdk, name]);

  if (render && children) {
    throw new Error(
      "Only one of 'render' or 'children' prop should be provided.",
    );
  }

  return flag.enabled ? (
    <Fragment>{render ? render(flag) : children}</Fragment>
  ) : null;
};

export default Flag;
