// useDebounce.ts
import { useEffect as useEffect2 } from "react";

// useTimeoutFn.ts
import { useCallback, useEffect, useRef } from "react";
function useTimeoutFn(fn, ms = 0) {
  const ready = useRef(false);
  const timeout = useRef();
  const callback = useRef(fn);
  const isReady = useCallback(() => ready.current, []);
  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);
  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);
  useEffect(() => {
    callback.current = fn;
  }, [fn]);
  useEffect(() => {
    set();
    return clear;
  }, [ms]);
  return [isReady, clear, set];
}

// useDebounce.ts
function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect2(reset, deps);
  return [isReady, cancel];
}
export {
  useDebounce,
  useTimeoutFn
};
