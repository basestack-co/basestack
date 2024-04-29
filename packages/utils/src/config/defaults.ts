export const protocol = "https:";
export const domainUrl = "basestack.co";
export const docsUrl = `${protocol}//docs.${domainUrl}`;
export const baseLandingUrl = `${protocol}//${domainUrl}`;

export const urls = {
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
    dev: {
      flags: `${protocol}//flags-dev.${domainUrl}`,
      forms: `${protocol}//forms-dev.${domainUrl}`,
    },
    prod: {
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
