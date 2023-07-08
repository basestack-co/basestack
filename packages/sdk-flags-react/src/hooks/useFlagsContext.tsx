import React, { useContext } from "react";
// Context
import { FlagsContext } from "../context";

export const useFlagsContext = () => {
  const context = useContext(FlagsContext);
  if (context === undefined) {
    throw new Error("FlagsContext must be used with FlagsProvider!");
  }
  return context;
};
