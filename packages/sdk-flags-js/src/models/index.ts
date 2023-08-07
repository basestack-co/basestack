// Store
import store from "../store";
// Utils
import fetch from "cross-fetch";
// Types
import { Params, FlagResult, Flag } from "../types";

class FlagsJS {
  private readonly apiUrl: string;
  private readonly projectKey: string;
  private readonly envKey: string;
  public isInitialized: boolean = false;

  constructor({ apiUrl, projectKey, envKey }: Params) {
    this.apiUrl = apiUrl;
    this.projectKey = projectKey;
    this.envKey = envKey;

    store.subscribe((state) => {
      this.isInitialized = state.isInitialized;
    });
  }

  async initialize() {
    const { setIsInitialized } = store.getState();
    await this.flagsAsync();
    setIsInitialized(true);
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

  async flagAsync(name: string): Promise<FlagResult<Flag | null>> {
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

  flag(name: string): FlagResult<Flag | null> {
    const { flags } = store.getState();
    const flag = flags.find((flag) => flag.slug === name);

    if (!flag) {
      return {
        enabled: false,
        error: true,
        message: `Flag with name ${name} does not exist`,
      };
    }

    return { ...flag, error: false };
  }
}

export default FlagsJS;
