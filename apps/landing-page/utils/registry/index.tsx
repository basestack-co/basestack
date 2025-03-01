"use client";

import React from "react";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Components
import { Toaster } from "sonner";
// Fonts
import "material-symbols/rounded.css";

const Registry = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      {children}
      <Toaster visibleToasts={9} closeButton={false} />
    </StyledComponentsRegistry>
  );
};

export default Registry;
