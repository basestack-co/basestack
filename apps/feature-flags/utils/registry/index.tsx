"use client";

import React from "react";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";
// Providers
import { SessionProvider } from "next-auth/react";
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
    <SessionProvider>
      <StyledComponentsRegistry>
        <TRPCReactProvider>
          {children}
          <Modals />
        </TRPCReactProvider>
        <Toaster visibleToasts={9} closeButton={false} />
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default Registry;
