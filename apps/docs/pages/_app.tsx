import React from "react";
import { AppProps } from "next/app";
// Fonts
import "material-symbols";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
