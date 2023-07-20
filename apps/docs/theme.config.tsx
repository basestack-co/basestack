import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
// Utils
import { repoUrl } from "utils/helpers";

const config: DocsThemeConfig = {
  logo: <span>Basestack</span>,
  project: {
    link: repoUrl,
  },
  docsRepositoryBase: `${repoUrl}/blob/master/apps/feature-flags-docs/pages`,
  footer: {
    text: "Basestack Docs",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Basestack Docs",
    };
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
};

export default config;
