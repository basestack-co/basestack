import {
  DependencyList,
  RefObject,
  EffectCallback,
  Dispatch,
  SetStateAction,
  RefCallback,
} from "react";

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

declare const useClickAway: <E extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: E) => void,
  events?: string[]
) => void;

declare const useEffectOnce: (effect: EffectCallback) => void;

declare const useHover: () => (
  | boolean
  | {
      onMouseOver(): void;
      onMouseOut(): void;
    }
)[];

declare const useMount: (fn: () => void) => void;

declare const useRafState: <S>(
  initialState: S | (() => S)
) => [S, Dispatch<SetStateAction<S>>];

declare const useUnmount: (fn: () => any) => void;

declare const useWindowSize: (
  initialWidth?: number,
  initialHeight?: number
) => {
  width: number;
  height: number;
};

declare const useMediaQuery: (query: string) => boolean;

declare const useRect: () => [
  RefCallback<HTMLElement | null>,
  DOMRect | undefined
];

export {
  useClickAway,
  useDebounce,
  useEffectOnce,
  useHover,
  useMediaQuery,
  useMount,
  useRafState,
  useRect,
  useTimeoutFn,
  useUnmount,
  useWindowSize,
};
