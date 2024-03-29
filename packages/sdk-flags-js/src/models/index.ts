// Store
import store from "../store";
// Utils
import fetch from "cross-fetch";
// Types
import type { Params, Flag } from "../types";

class FlagsJS {
  private readonly apiUrl: string;
  private readonly projectKey: string;
  private readonly envKey: string;
  public isInitialized: boolean = false;

  constructor({ apiUrl, projectKey, envKey }: Params) {
    this.apiUrl = apiUrl;
    this.projectKey = projectKey;
    this.envKey = envKey;
  }

  async initialize(): Promise<boolean> {
    await this.flagsAsync();
    this.isInitialized = true;
    return true;
  }

  async flagsAsync(): Promise<Flag[]> {
    try {
      const { setFlags } = store.getState();
      const url = `${this.apiUrl}/flags`;

      const response = await fetch(url, {
        headers: {
          "x-project-key": this.projectKey,
          "x-environment-key": this.envKey,
        },
      });

      const { flags } = await response.json();

      // Update the store
      setFlags(flags);

      // Return the flags
      return flags;
    } catch (e) {
      throw e;
    }
  }

  async flagAsync(name: string): Promise<Flag> {
    try {
      const url = `${this.apiUrl}/flags/${name}`;
      const response = await fetch(url, {
        headers: {
          "x-project-key": this.projectKey,
          "x-environment-key": this.envKey,
        },
      });
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  flags(): Flag[] {
    const { flags } = store.getState();
    return flags;
  }

  flag(name: string): Flag {
    const { flags } = store.getState();
    const flag = (flags ?? []).find((flag) => flag.slug === name);

    if (!flag) {
      return {
        enabled: false,
        error: true,
        slug: "",
        description: `Flag with name ${name} does not exist`,
      };
    }

    return { ...flag, error: false };
  }
}

export default FlagsJS;
