"use client";

// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type React from "react";
// Components
import { Toaster } from "sonner";
// TRPC
import { TRPCReactProvider } from "utils/trpc/react";
// Registries
import StyledComponentsRegistry from "./StyledComponentsRegistry";

// Fonts
import "material-symbols/rounded.css";

dayjs.extend(relativeTime);

const Registry = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster visibleToasts={9} closeButton={false} />
    </StyledComponentsRegistry>
  );
};

export default Registry;
