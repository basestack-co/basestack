# JS Vanilla Integration

Integration with JavaScript Vanilla helps and facilitates the process of testing and developing features in production and other environments. The vanilla version can be integrated into any environment that uses JavaScript, you can use this integration in projects like Vue, Svelte or other JavaScript frameworks.

## Why Feature Flags?

Feature flags are an excellent way to test features in production. Take advantage of different environments to hide or show your features. This can be used to facilitate the development process on project features that are not yet ready to be presented in production or even disable in real-time if any of the features in production are malfunctioning

## Getting Started

Start by installing the library following the instructions below.

Quick links

- [About](https://basestack.co/)
- [Documentation](https://docs.basestack.co/)

## Installation

First, let's install some packages!

```bash
npm install --save @basestack/flags-js
```

or with yarn

```bash
yarn add @basestack/flags-js
```

or with Script Tag

```bash
<script type="module" src="https://unpkg.com/@basestack/flags-js"></script>
```

## Create a new instance

This params values can be found on the on your project's settings

```js
import { FlagsSDK } from "@basestack/flags-js";

// Basic Initialization
const client = new FlagsSDK({
  projectKey: "your-project-key",
  environmentKey: "your-environment-key",
});

// Custom Configuration Example
const advancedClient = new FlagsSDK({
  baseURL: "https://your-basestack-hosted-app-domain.com/api/v1",
  projectKey: "your-project-key",
  environmentKey: "your-environment-key",
  preloadFlags: ["header", "footer"],
  cache: {
    enabled: true,
    ttl: 10 * 60 * 1000, // 10-minute cache
    maxSize: 50, // Limit cache to 50 entries
  },
});
```

That's it! Now your app is ready to start using feature flags and other features. Follow the instructions of the supported methods to make the most of the Basestack Feature Flags functionalities.

## Usage

```js
import { FlagsSDK } from "@basestack/flags-js";

const client = new FlagsSDK({
  projectKey: "your-project-key",
  environmentKey: "your-environment-key",
});

// Preload flags on initialization (optional)
// This will fetch the flags and cache them for future use
// But you can still fetch flags on-demand using getFlag()
await client.init();

// Fetching a Single Flag
async function checkFeatureFlag() {
  try {
    const headerFlag = await client.getFlag("header");

    if (headerFlag.enabled) {
      console.log("Header feature is enabled");
      console.log("Payload:", headerFlag.payload);
      // Additional flag properties
    } else {
      console.log("Header feature is disabled");
    }
  } catch (error) {
    console.error("Failed to fetch flag:", error);
  }
}

// Fetching All Flags
async function listAllFlags() {
  try {
    const { flags } = await client.getAllFlags();

    flags.forEach((flag) => {
      console.log(`Flag: ${flag.slug}`);
      console.log(`Enabled: ${flag.enabled}`);
      console.log(`Description: ${flag.description}`);
      // Additional flag properties
    });
  } catch (error) {
    console.error("Failed to fetch flags:", error);
  }
}

// Cache Management
function manageCaching() {
  // Clear entire cache
  client.clearCache();

  // Clear cache for a specific flag
  client.clearFlagCache("header");
}

// Practical Example

async function renderFeature() {
  try {
    const headerFlag = await client.getFlag("new-header-design");

    if (headerFlag.enabled) {
      // Render new header design
      renderNewHeader(headerFlag.payload);
    } else {
      // Render default header
      renderDefaultHeader();
    }
  } catch (error) {
    // Fallback to default implementation
    renderDefaultHeader();
  }
}

// Types
import { CacheConfig, SDKConfig, Flag } from "@basestack/flags-js";
```
