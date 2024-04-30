const nextTranslate = require("next-translate-plugin");
const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = nextTranslate({
  reactStrictMode: true,
  // output: "standalone", // Enable this if the app is a standalone app for docker deployment
  transpilePackages: ["@basestack/design-system", "@basestack/ui"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,
    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,
    // Hides source maps from generated client bundles
    hideSourceMaps: true,
    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
  async redirects() {
    return [
      {
        source: "/form/:formId",
        destination: "/form/:formId/submissions",
        permanent: false,
      },
      {
        source: "/form/:formId/settings",
        destination: "/form/:formId/settings/general",
        permanent: false,
      },
    ];
  },
});

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  // Required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Suppresses all logs
  silent: true,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
