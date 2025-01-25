# JS Vanilla Integration

Integration with JavaScript Vanilla helps and facilitates the process of testing and developing features in production and other environments. The vanilla version can be integrated into any environment that uses JavaScript, you can use this integration in projects like Vue, Svelte or other JavaScript frameworks.

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
import FlagsJS from "@basestack/flags-js";

const sdk = new FlagsJS({
  apiUrl: "https://your-basestack-hosted-app-domain.com/api/v1",
  projectKey: "xxxxx",
  envKey: "xxxxx",
});
```

That's it! Now your app is ready to start using feature flags and other features. Follow the instructions of the supported methods to make the most of the Basestack Feature Flags functionalities.

## Usage

```js
import FlagsJS from "@basestack/flags-js";

const sdk = new FlagsJS({
  apiUrl: "https://your-basestack-hosted-app-domain.com/api/v1",
  projectKey: "xxxxx",
  envKey: "xxxxx",
});

//async/await
const MyFeature = async () => {
  try {
    const flag = await sdk.flagAsync("header");
    //flag.enabled true | false
    //  ...code
  } catch (e) {
    throw e;
  }
};

//Promises
const AnotherFeature = async () => {
  sdk
    .flagAsync("my_flag")
    .then((flag) => {
      //flag.enabled
      //...code
    })
    .catch((e) => throw e);
};
```

## Flags

---

Feature flags are an excellent way to test features in production. Take advantage of different environments to hide or show your features. This can be used to facilitate the development process on project features that are not yet ready to be presented in production or even disable in real-time if any of the features in production are malfunctioning

```js
sdk.flag("my_flag");

/*

Success Response: 

    { 
      slug: string;
      enabled: boolean;
      payload?: unknown;
      expiredAt?: Date;
      createdAt: Date;
      updatedAt: Date;
      description: string;
      error: boolean;
    }
  
Error Response: 

    {
      enabled: boolean;
      error: boolean;
      message: string;
    }
*/
```

```js
// Basic Initialization
const client = new FlagsSDK({
  projectKey: "your-project-key",
  environmentKey: "your-environment-key",
});

// Custom Configuration Example
const advancedClient = new FlagsSDK({
  projectKey: "proj-key",
  environmentKey: "env-key",
  baseURL: "https://custom-flags.company.com/api/v1",
  preloadFlags: ["header", "footer"],
  cache: {
    enabled: true,
    ttl: 10 * 60 * 1000, // 10-minute cache
    maxSize: 50, // Limit cache to 50 entries
  },
});

async function setupApp() {
  // Preload flags
  await client.init();
}

// Fetching a Single Flag
async function checkFeatureFlag() {
  try {
    const headerFlag = await client.getFlag("header");

    if (headerFlag.enabled) {
      console.log("Header feature is enabled");
      console.log("Payload:", headerFlag.payload);
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

// Error Handling
async function robustFlagChecking() {
  try {
    const flag = await client.getFlag("non-existent-flag");
  } catch (error) {
    // Handle specific error scenarios
    if (error.message.includes("does not exist")) {
      console.log("Flag not found");
    }
  }
}

// Practical Example
const featureFlags = new FeatureFlagClient({
  projectKey: process.env.PROJECT_KEY,
  environmentKey: process.env.ENVIRONMENT_KEY,
});

async function renderFeature() {
  try {
    const headerFlag = await featureFlags.getFlag("new-header-design");

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
```
