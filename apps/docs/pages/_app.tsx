import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
// Fonts
import "material-symbols";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      {process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}

export default MyApp;
