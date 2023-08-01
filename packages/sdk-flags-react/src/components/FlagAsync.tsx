import React, { Fragment } from "react";
// Context
import useFlagAsync from "../hooks/useFlagAsync";
// Hooks
// Types
import { FlagResult, Flag } from "../types";

export interface Props {
  children?: React.ReactNode;
  name: string;
  render?: (flag: FlagResult<Flag | null>) => React.ReactNode;
}
const FlagAsync = ({ name, render, children }: Props) => {
  const { isLoading, flag } = useFlagAsync(name);

  if (render && children) {
    throw new Error(
      "Only one of 'render' or 'children' prop should be provided.",
    );
  }

  return !isLoading && flag?.enabled ? (
    <Fragment>{render ? render(flag) : children}</Fragment>
  ) : null;
};

export default FlagAsync;
