"use client";

import React from "react";
import Head from "next/head";
// Components
import { WaitingList } from "components";
// Content
import { waitingList } from "content/landing-page";

const MainPage = () => {
  return (
    <>
      <Head>
        <title>Basestack - Early Access</title>
        <meta name="title" content="Basestack - Early Access" />
        <meta
          name="description"
          content="The Essential Stack for Developers and Startups"
        />

        {/* <!-- Open Graph / Facebook -->*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://basestack.co/" />
        <meta property="og:title" content="Basestack - Early Access" />
        <meta
          property="og:description"
          content="The Essential Stack for Developers and Startups"
        />
        <meta
          property="og:image"
          content="https://www.vitoramaral.co/api/og?title=⛳,🌐,💻"
        />

        {/* <!-- Twitter -->*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://basestack.co/" />
        <meta property="twitter:title" content="Basestack - Early Access" />
        <meta
          property="twitter:description"
          content="The Essential Stack for Developers and Startups"
        />
        <meta
          property="twitter:image"
          content="https://www.vitoramaral.co/api/og?title=⛳,🌐,💻"
        />
      </Head>
      <WaitingList data={waitingList} />
    </>
  );
};

export default MainPage;
