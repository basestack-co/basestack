import React, { Fragment, useEffect } from "react";
// SDK
import FlagsJS from "@basestack/flags-js-sdk";

export interface Props {
  children?: React.ReactNode;
  apiUrl: string;
  projectKey: string;
  envKey: string;
  onSuccessfulInit?: (isInitialized: boolean) => void;
}

const Provider = ({
  children,
  apiUrl,
  envKey,
  projectKey,
  onSuccessfulInit,
}: Props) => {
  // Initialize SDK on mount
  useEffect(() => {
    // Initialize SDK with provided values
    const initializeSdk = async () => {
      try {
        const sdk = new FlagsJS({
          apiUrl,
          projectKey,
          envKey,
        });

        // Initialize SDK
        await sdk.initialize();

        if (typeof onSuccessfulInit === "function") {
          onSuccessfulInit(true);
        }
      } catch (error) {
        if (typeof onSuccessfulInit === "function") {
          onSuccessfulInit(false);
        }
      }
    };

    initializeSdk();
  }, [apiUrl, projectKey, envKey, onSuccessfulInit]);

  return <Fragment>{children}</Fragment>;
};

export default Provider;
