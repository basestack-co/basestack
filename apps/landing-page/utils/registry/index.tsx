"use client";

import React from "react";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Fonts
import "material-symbols/rounded.css";

const Registry = ({ children }: { children: React.ReactNode }) => {
  return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>;
};

export default Registry;
