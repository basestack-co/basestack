import React, { Fragment } from "react";
// Types
import type { Flag, FlagResult } from "@basestack/flags-js-sdk";
// Context
import useFlagAsync from "../hooks/useFlagAsync";

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
