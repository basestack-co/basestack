// Types
import { AppEnv, Product } from "../types";

const protocol = "https:";
const domainUrl = "basestack.co";
const docsUrl = `${protocol}//docs.${domainUrl}`;
const baseLandingUrl = `${protocol}//${domainUrl}`;

const commons = {
  baseLandingUrl,
  repo: "https://github.com/basestack-co/basestack",
  twitter: "https://twitter.com/basestack_co",
  product: {
    flags: `${baseLandingUrl}/feature-flags`,
    forms: `${baseLandingUrl}/forms`,
  },
  legal: {
    privacy: `${baseLandingUrl}/legal/privacy`,
    cookies: `${baseLandingUrl}/legal/cookies`,
    terms: `${baseLandingUrl}/legal/terms`,
  },
  app: {
    local: {
      flags: "http://localhost:3000",
      forms: "http://localhost:3003",
    },
    development: {
      flags: `${protocol}//flags-dev.${domainUrl}`,
      forms: `${protocol}//forms-dev.${domainUrl}`,
    },
    staging: {
      flags: `${protocol}//flags-staging.${domainUrl}`,
      forms: `${protocol}//forms-staging.${domainUrl}`,
    },
    production: {
      flags: `${protocol}//flags.${domainUrl}`,
      forms: `${protocol}//forms.${domainUrl}`,
    },
  },
  docs: {
    base: docsUrl,
    contribute: `${docsUrl}/contributing`,
    flags: {
      base: `${docsUrl}/feature-flags`,
      sdk: {
        base: `${docsUrl}/feature-flags/sdks/javascript`,
        javascript: `${docsUrl}/feature-flags/sdks/javascript`,
        react: `${docsUrl}/feature-flags/sdks/react`,
        rest: `${docsUrl}/feature-flags/sdks/rest-api`,
      },
    },
    forms: {
      base: `${docsUrl}/forms`,
    },
  },
};

const getAppWithEnv = (product: Product, env: AppEnv): string => {
  const appUrls = commons.app[env] || {};
  return appUrls[product] || baseLandingUrl;
};

export const urls = {
  ...commons,
  getAppWithEnv,
};
