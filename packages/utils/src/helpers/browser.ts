// @ts-ignore
export function on<T extends Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: // @ts-ignore
  Parameters<T["addEventListener"]> | [string, () => void | null, ...any]
): void {
  // @ts-ignore
  if (obj && obj.addEventListener) {
    // @ts-ignore
    obj.addEventListener(
      // @ts-ignore
      ...(args as Parameters<HTMLElement["addEventListener"]>),
    );
  }
}

export function off<T extends Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: // @ts-ignore
  Parameters<T["removeEventListener"]> | [string, () => void | null, ...any]
): void {
  // @ts-ignore
  if (obj && obj.removeEventListener) {
    // @ts-ignore
    obj.removeEventListener(
      // @ts-ignore
      ...(args as Parameters<HTMLElement["removeEventListener"]>),
    );
  }
}

export const isBrowser = typeof window !== "undefined";
export const isNavigator = typeof navigator !== "undefined";

export const validURL = (str: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  );
  return pattern.test(str);
};

export const urlQueryBuilder = (urlParams: any) => {
  const esc = encodeURIComponent;
  return Object.keys(urlParams)
    .filter((x) => !urlParams[x])
    .map((k) => esc(k) + "=" + esc(urlParams[k]))
    .join("&");
};
