# JS Vanilla Integration

Integration with JavaScript Vanilla helps and facilitates the process of testing and developing features in production and other environments. The vanilla version can be integrated into any environment that uses JavaScript, you can use this integration in projects like Vue, Svelte or other JavaScript frameworks.

Start by installing the library following the instructions below.

Quick links

- [About](https://basestack.co/)
- [Documentation](https://docs.basestack.co/)

## Installation

First, let's install some packages!

```bash
npm install --save @basestack/flags-js-sdk
```

or with yarn

```bash
yarn add @basestack/flags-js-sdk
```

or with Script Tag

```bash
<script type="module" src="https://unpkg.com/@basestack/flags-js-sdk"></script>
```

## Create a new instance

This params values can be found on the on your project's settings

```js
import FlagsJS from "@basestack/flags-js-sdk";

const sdk = new FlagsJS({
  apiUrl: "https://your-basestack-hosted-app-domain.com/api/v1",
  projectKey: "xxxxx",
  envKey: "xxxxx",
});
```

That's it! Now your app is ready to start using feature flags and other features. Follow the instructions of the supported methods to make the most of the UpStamps functionalities.

## Usage

```js
import FlagsJS from "@basestack/flags-js-sdk";

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
