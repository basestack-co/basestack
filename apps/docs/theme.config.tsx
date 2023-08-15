import React, { useState, useEffect } from "react";
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";
// Utils
import { config as defaults } from "@basestack/utils";

const config: DocsThemeConfig = {
  logo: <span>Basestack</span>,
  logoLink: true,
  project: {
    link: defaults.urls.repo,
  },
  docsRepositoryBase: `${defaults.urls.repo}/blob/master/apps/docs/pages`,
  useNextSeoProps: function SEO() {
    const { frontMatter } = useConfig();
    const section = "Basestack Docs";
    const defaultTitle = frontMatter.overrideTitle || section;

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: `%s – ${section}`,
    };
  },
  // Code retrieve from https://github.com/vercel/turbo/blob/main/docs/theme.config.tsx
  // This will add a "Last updated on" message to the footer of every page.
  gitTimestamp({ timestamp }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [dateString, setDateString] = useState(timestamp.toISOString());

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      try {
        setDateString(
          timestamp.toLocaleDateString(navigator.language, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        );
      } catch (e) {
        // Ignore errors here; they get the ISO string.
        // At least one person out there has manually misconfigured navigator.language.
      }
    }, [timestamp]);

    return <>Last updated on {dateString}</>;
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Basestack Docs" />
      <meta
        property="og:description"
        content="The official Basestack documentation"
      />
    </>
  ),
  /* navbar: {
    component: Navigation,
    extraContent: (
      <>
        <Github />
        <Discord />
      </>
    ),
  }, */
  footer: {
    text: "© Basestack 2023",
  },
  /* footer: {
    component: () => <p>Basestack Docs</p>,
  }, */
  search: {
    placeholder: "Search documentation…",
  },
  i18n: [],
  editLink: {
    text: "Edit this page on GitHub",
  },
  chat: {
    link: defaults.urls.twitter,
    icon: (
      <svg width="24" height="24" viewBox="0 0 248 204">
        <path
          fill="currentColor"
          d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
        />
      </svg>
    ),
  },
};

export default config;
