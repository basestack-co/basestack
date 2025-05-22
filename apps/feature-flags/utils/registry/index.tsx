"use client";

import React from "react";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// Components
import { Toaster } from "sonner";
// TRPC
import { TRPCReactProvider } from "utils/trpc/react";
// Modals
import Modals from "modals";
// Fonts
import "material-symbols/rounded.css";

dayjs.extend(relativeTime);

const Registry = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <TRPCReactProvider>
        {children}
        <Modals />
      </TRPCReactProvider>
      <Toaster visibleToasts={9} closeButton={false} />
    </StyledComponentsRegistry>
  );
};

export default Registry;
