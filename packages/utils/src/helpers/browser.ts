// Utils
import Cookies from "js-cookie";

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
    .map((k) => `${esc(k)}=${esc(urlParams[k])}`)
    .join("&");
};

export const downloadCSV = (csvData: string, filename: string): void => {
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getCookieValueAsBoolean = (name: string): boolean => {
  if (typeof document === "undefined") {
    // Safe guard for server-side rendering
    return false;
  }

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      const lowerCaseValue = cookieValue.toLowerCase();
      if (lowerCaseValue === "true") return true;
      if (lowerCaseValue === "false") return false;
    }
  }
  return false;
};

export const clearAllBrowserStorage = () => {
  localStorage.clear();
  sessionStorage.clear();

  const allCookies = document.cookie.split(";");

  for (const cookie of allCookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();

    Cookies.remove(name, { path: "/" });
    Cookies.remove(name, { path: window.location.pathname });
  }
};
