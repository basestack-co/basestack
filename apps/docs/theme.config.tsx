import React, { useState, useEffect } from "react";
import { useConfig, type DocsThemeConfig } from "nextra-theme-docs";
// Utils
import { REPO_URL } from "utils/helpers";

const config: DocsThemeConfig = {
  logo: <span>Basestack</span>,
  logoLink: true,
  project: {
    link: REPO_URL,
  },
  docsRepositoryBase: `${REPO_URL}/blob/master/apps/docs/pages`,
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
};

export default config;
