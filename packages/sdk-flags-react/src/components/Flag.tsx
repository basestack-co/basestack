import React, { Fragment } from "react";
// Types
import { Flag, FlagResult } from "@basestack/flags-js-sdk";
// Context
import useFlag from "../hooks/useFlag";

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
