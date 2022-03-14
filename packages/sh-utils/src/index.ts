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
      ...(args as Parameters<HTMLElement["addEventListener"]>)
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
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    );
  }
}

export const isBrowser = typeof window !== "undefined";
