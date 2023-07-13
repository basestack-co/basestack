import type { AppProps } from "next/app";
//Styles
import { ThemeProvider } from "styled-components";
import theme from "@basestack/design-system/theme";
// Fonts
import "material-symbols";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
