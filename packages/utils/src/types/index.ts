/*
 *
 *  UTILS
 *
 * */

export type RemoveNullAndUndefined<T> = T extends null | undefined
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: RemoveNullAndUndefined<T[K]>;
      }
    : T;
