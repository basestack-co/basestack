"use client";

// Components
import { WaitingList } from "components";
import Head from "next/head";
import React from "react";

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
      <WaitingList
        data={[
          {
            icon: "flag",
            title: "Manage Multiple Projects Easily",
            text: "Control feature releases across multiple projects and environments.",
            image: {
              src: "/images/flags_cards_popups.png",
              alt: "An image of a feature flag control panel displaying multiple projects and environments, with intuitive controls for easily managing feature releases.",
            },
          },
          {
            icon: "history",
            title: "Confident Feature Flag Control",
            text: "Streamlined management, monitoring, and automated change tracking.",
            image: {
              src: "/images/flag_history.png",
              alt: "An image of a feature flag dashboard displaying streamlined management, monitoring, and automated change tracking features. The dashboard provides clear and concise data visualization and intuitive controls for easy navigation and management.",
            },
          },
          {
            icon: "send",
            title: "Efficient Remote Configuration",
            text: "Optimize your feature flag config with dynamic payload data changes.",
            image: {
              src: "/images/create_flag_advanced.png",
              alt: "An image of a feature flag configuration interface, displaying dynamic payload data changes. The interface provides intuitive controls for easily making and testing feature flag changes.",
            },
          },
        ]}
      />
    </>
  );
};

export default MainPage;
