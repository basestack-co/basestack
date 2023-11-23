export type EmptyArray = Array<never>;
export type Blank = null | undefined | void;

export type Nullable<T> = T extends null | undefined ? T : never;

export type AnyFunction = (...args: any[]) => any;

export type AllowedEmptyCheckTypes = Blank | string | object;

export type Empty<T extends AllowedEmptyCheckTypes> = T extends Blank
  ? T
  : T extends string
    ? ""
    : T extends any[]
      ? EmptyArray
      : T extends object
        ? {}
        : never;

export const isFunction = <T extends AnyFunction>(value: any): value is T =>
  typeof value === "function";

export const isString = (value: any): value is string =>
  typeof value === "string";

export const isNumber = (value: any): value is number =>
  typeof value === "number";

export const isArray = <T>(value: any): value is Array<T> =>
  Array.isArray(value);

export const isObject = <T extends object>(value: any): value is T =>
  value != null && !Array.isArray(value) && typeof value === "object";

export const isDate = (value: any): value is Date =>
  value instanceof Date && !isNaN(+value);

export const isBlank = (str: any) => {
  return !str || /^\s*$/.test(str);
};

export const isEmpty = <T extends string | object | any[] | undefined | null>(
  value: T,
): value is never => {
  if (isString(value) || isArray(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (isBlank(value)) {
    return true;
  }

  return false;
};
