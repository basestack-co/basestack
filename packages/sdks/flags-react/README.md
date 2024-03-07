## React Integration

Integration with React helps and facilitates the process of testing and developing features in production and other environments. This integration consists of a set of plug-and-play components to accelerate the development process in your project.

Start by installing the library following the instructions below.

Quick links

- [About](https://basestack.co/)
- [Documentation](https://docs.basestack.co/)

## Installation

First, let's install some packages!

```bash
npm install --save @basestack/flags-js @basestack/flags-react
```

or with yarn

```bash
yarn add @basestack/flags-js @basestack/flags-react
```

## Create a client provider

With all the dependencies you installed, let's create your Basestack FlagsJS Client.

In our `index.js` file, let's import `FlagsProvider` from `@basestack/flags-react` and add the configuration params based on your Basestack project. This params values can be found on your project settings page.

```js
import FlagsJS from "@basestack/flags-js";
import { FlagsProvider } from "@basestack/flags-react";

const sdk = new FlagsJS({
  apiUrl: "https://your-basestack-hosted-app-domain.com/api/v1",
  projectKey: "xxxxx",
  envKey: "xxxxx",
});

root.render(
  <FlagsProvider
    sdk={sdk}
    onSuccessfulInit={() => console.log("Successful Init FlagsJS SDK")}
  >
    <App />
  </FlagsProvider>,
);
```

That's it! Now your app is ready to start using feature flags and other features. Let's start using by importing some pre-built components inside of `@basestack/flags-react`.

## Flags

---

Feature flags are an excellent way to test features in production. Take advantage of different environments to hide or show your features. This can be used to facilitate the development process on project features that are not yet ready to be presented in production or even disable in real-time if any of the features in production are malfunctioning

### useFlag Hook

The library support React hooks. Use `useFlag` for a programmatical method. There's no limit to `useFlag`, just change the names. See the examples.

```js
import {  useFlag } from "@basestack/flags-react";

...

const AppComponent = () => {
  const { enabled } = useFlag("private_msg_2");
 const privateChat = useFlag("private_chat");

  return (
    <div>
      {enabled && <div>This is a great feature</div>}
     {privateChat.enabled && <div>This is a great private chat</div>}
    </div>
  );
};
```

### useFlag Hook with Remote Flags

---

Remote Flags have the same normal characteristics as a Flag but they can have a data payload. This data payload allows you to provide real-time properties to your project's features. If, for example, some of the features of a project need to change color, size or even other data in different environments, then the payload of data from a Remote Flag is the most suitable.

```js
import { useFlag } from "@basestack/flags-react";

...

const AppComponent = () => {
  const { enable, payload } = useFlag("my_remote_flag");

  return (
    <div>
      {enabled && <div style={{ color: payload.color }}>This is a great remote feature</div>}
    </div>
  );
};
```

### Flag Component

The pre-built component `Flag` accepts a component child or children, this component inside the `<Flag>` wrapper only showed when the flag exists in your Basestack Feature Flags Project.

Notice: The behavior of the flag can be based on the project or the environments.

```js
import {  Flag } from "@basestack/flags-react";

...

<Flag name="private_msg_2">
  <YourFeature/>
</Flag>

```
