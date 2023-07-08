// Types
import { Flag } from "../types";

export const verifyFlag = (flags: Flag[], name: string) => {
  const flag = flags.find((flag: Flag) => flag.slug === name) as Flag;

  if (!flag) {
    return {
      enabled: false,
      error: true,
      message: `Flag with name ${name} does not exist`,
    };
  }

  return { ...flag, error: false };
};
