import React, { Fragment } from "react";
// Types
import type { Flag } from "../types";
// Context
import useFlag from "../hooks/useFlag";

export interface Props {
  children?: React.ReactNode;
  name: string;
  render?: (flag: Flag) => React.ReactNode;
}
const FlagComponent = ({ name, render, children }: Props) => {
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

export default FlagComponent;
