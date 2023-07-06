import React from "react";
import defaultTheme from "../theme";
import { render, RenderResult } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

const Provider = ({
  children,
  theme = defaultTheme,
}: {
  children: React.ReactNode;
  theme: any;
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export const renderWithTheme = (
  ui: React.ReactElement,
  options?: any,
): RenderResult => render(ui, { wrapper: Provider, ...options });
