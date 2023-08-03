import React, { useMemo, Fragment } from "react";
// Context
import useFlag from "../hooks/useFlag";
// Types
import { FlagResult, Flag } from "../types";

export interface Props {
  children?: React.ReactNode;
  name: string;
  render?: (flag: FlagResult<Flag | null>) => React.ReactNode;
}
const Flag = ({ name, render, children }: Props) => {
  const flag = useFlag(name);

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
