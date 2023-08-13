import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
// Fonts
import "material-symbols";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />;
      {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
        <Script
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!}
          src="https://analytics.umami.is/script.js"
          strategy="lazyOnload"
        />
      )}
    </>
  );
}

export default MyApp;
