import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
// Fonts
import "material-symbols";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
