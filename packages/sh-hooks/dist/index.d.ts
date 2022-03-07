import { DependencyList } from "react";

declare type UseDebounceReturn = [() => boolean | null, () => void];
declare function useDebounce(
  fn: () => void,
  ms?: number,
  deps?: DependencyList
): UseDebounceReturn;

declare type UseTimeoutFnReturn = [
  () => boolean | null,
  () => void,
  () => void
];
declare function useTimeoutFn(fn: () => void, ms?: number): UseTimeoutFnReturn;

export { useDebounce, useTimeoutFn };
