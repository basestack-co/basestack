declare function on<T extends Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: // @ts-ignore
  Parameters<T["addEventListener"]> | [string, () => void | null, ...any]
): void;
declare function off<T extends Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: // @ts-ignore
  Parameters<T["removeEventListener"]> | [string, () => void | null, ...any]
): void;
declare const isBrowser: boolean;

export { isBrowser, off, on };
