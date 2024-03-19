"use client";

import React from "react";
// Store
import { useStore } from "store";
//Styles
import StyledComponentsRegistry from "./StyledComponentsRegistry";

import { ThemeProvider } from "styled-components";
import darkTheme from "@basestack/design-system/theme/darkTheme";
import lightTheme from "@basestack/design-system/theme/lightTheme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
// Modals
import Modals from "modals";
// Auth
import { SessionProvider } from "next-auth/react";
// Server
import { trpc } from "libs/trpc";
// Fonts
import "material-symbols/sharp.css";
// Dates
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Registry = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <>{children}</>
          <Modals />
        </ThemeProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
};

export default trpc.withTRPC(Registry);
