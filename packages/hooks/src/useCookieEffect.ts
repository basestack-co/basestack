import { useEffect, useState } from "react";

interface CookieHookReturnType {
  cookieValue: string | boolean | null;
  setCookie: (value: string | boolean, daysToExpire: number) => void;
}

const useCookieEffect = (cookieName: string): CookieHookReturnType => {
  const [cookieValue, setCookieValue] = useState<string | boolean | null>(null);

  useEffect(() => {
    // Read the cookie value when the component mounts
    const cookies = document.cookie.split("; ");
    const foundCookie = cookies.find((cookie) =>
      cookie.startsWith(`${cookieName}=`),
    );

    if (foundCookie) {
      const [, value] = foundCookie.split("=");
      const decodedValue = decodeURIComponent(value);

      // Check if the value is "true" or "false" and convert to boolean if necessary
      if (decodedValue === "true" || decodedValue === "false") {
        setCookieValue(decodedValue === "true");
      } else {
        setCookieValue(decodedValue);
      }
    } else {
      setCookieValue(null);
    }

    return () => {
      // Perform cleanup here if needed
    };
  }, [cookieName]);

  const setCookie = (value: string | boolean, daysToExpire: number): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);

    // Convert boolean to string if the value is a boolean
    const stringValue = typeof value === "boolean" ? value.toString() : value;

    document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(
      stringValue,
    )}; expires=${expirationDate.toUTCString()}; path=/`;
    setCookieValue(value);
  };

  return {
    cookieValue,
    setCookie,
  };
};

export default useCookieEffect;
