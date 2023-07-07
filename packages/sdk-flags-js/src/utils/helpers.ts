// Types
import { Flag } from "../types";

export const verifyFlag = (flags: Flag[], slug: string) => {
  const flag = flags.find((flag: Flag) => flag.slug === slug) as Flag;

  if (!flag) {
    return {
      enabled: false,
      error: true,
      message: `Flag with name ${slug} does not exist`,
    };
  }

  return { ...flag, error: false };
};
