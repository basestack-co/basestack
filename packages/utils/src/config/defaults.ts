export const protocol = "https:";
export const domainUrl = "basestack.co";
export const docsUrl = `${protocol}//docs.${domainUrl}`;

export const urls = {
  base: `${protocol}${domainUrl}`,
  repo: "https://github.com/basestack-co/basestack",
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
  },
};
