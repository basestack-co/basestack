import fetch from "node-fetch";
// Types
import { Params, FlagsResponse, Flag } from "./types";

// TODO: change the name in the future for the real product name
class FlagsJS {
  readonly apiUrl: string;
  readonly projectKey: string;
  readonly envKey: string;

  constructor({ apiUrl, projectKey, envKey }: Params) {
    this.apiUrl = apiUrl;
    this.projectKey = projectKey;
    this.envKey = envKey;
  }

  async flags() {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/${this.envKey}/flags`;

      const response = await fetch(url);
      const data = (await response.json()) as FlagsResponse;

      return {
        ...data,
      };
    } catch (e) {
      throw e;
    }
  }

  async flag(slug: string) {
    try {
      const url = `${this.apiUrl}/${this.projectKey}/${this.envKey}/flags`;

      const response = await fetch(url);
      const { flags } = (await response.json()) as FlagsResponse;

      const flag = flags.find((flag: Flag) => flag.slug === slug) as Flag;
      const isEmpty = Object.keys(flag).length === 0;

      return isEmpty
        ? {
            enabled: false,
            error: true,
            message: `Flag with name ${slug} does not exist`,
          }
        : { ...flag };
    } catch (e) {
      throw e;
    }
  }
}

export default FlagsJS;
