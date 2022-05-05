// Utils
import isEmpty from "lodash.isempty";

export const isBrowser = typeof window !== "undefined";

export const isNavigator = typeof navigator !== "undefined";

/**
 * UTILS OPERATIONS
 */

export const validURL = (str: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
};

export const urlQueryBuilder = (urlParams: any) => {
  const esc = encodeURIComponent;
  return Object.keys(urlParams)
    .filter((x) => !isEmpty(urlParams[x]))
    .map((k) => esc(k) + "=" + esc(urlParams[k]))
    .join("&");
};

export function groupArrayOfObjects(list: Array<any>, key: string) {
  return list.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}