"use client";

// Themes
import darkTheme from "@basestack/design-system/theme/darkTheme";
import GlobalStyle from "@basestack/design-system/theme/GlobalStyle";
import lightTheme from "@basestack/design-system/theme/lightTheme";
// Styles Utils
import { useServerInsertedHTML } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useStore } from "store";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";
import AppGlobalStyle from "styles/applGlobalStyles";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};

const WithThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <StyledComponentsRegistry>
        <GlobalStyle />
        <AppGlobalStyle />
        {children}
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
};

export default WithThemeProvider;
