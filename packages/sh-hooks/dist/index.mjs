var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "../../node_modules/tsup/assets/esm_shims.js"() {
  }
});

// ../sh-utils/dist/index.js
var require_dist = __commonJS({
  "../sh-utils/dist/index.js"(exports, module) {
    init_esm_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __reExport2 = (target, module2, copyDefault, desc) => {
      if (module2 && typeof module2 === "object" || typeof module2 === "function") {
        for (let key of __getOwnPropNames2(module2))
          if (!__hasOwnProp2.call(target, key) && (copyDefault || key !== "default"))
            __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc2(module2, key)) || desc.enumerable });
      }
      return target;
    };
    var __toCommonJS = /* @__PURE__ */ ((cache) => {
      return (module2, temp) => {
        return cache && cache.get(module2) || (temp = __reExport2(__markAsModule2({}), module2, 1), cache && cache.set(module2, temp), temp);
      };
    })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
    var src_exports = {};
    __export(src_exports, {
      isBrowser: () => isBrowser2,
      off: () => off3,
      on: () => on3
    });
    function on3(obj, ...args) {
      if (obj && obj.addEventListener) {
        obj.addEventListener(...args);
      }
    }
    function off3(obj, ...args) {
      if (obj && obj.removeEventListener) {
        obj.removeEventListener(...args);
      }
    }
    var isBrowser2 = typeof window !== "undefined";
    module.exports = __toCommonJS(src_exports);
  }
});

// src/index.ts
init_esm_shims();

// src/useDebounce.ts
init_esm_shims();
import { useEffect as useEffect2 } from "react";

// src/useTimeoutFn.ts
init_esm_shims();
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

// src/useDebounce.ts
function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect2(reset, deps);
  return [isReady, cancel];
}

// src/useClickAway.ts
init_esm_shims();
var import_sh_utils = __toESM(require_dist());
import { useEffect as useEffect3, useRef as useRef2 } from "react";
var defaultEvents = ["click"];
var useClickAway = (ref, onClickAway, events = defaultEvents) => {
  const savedCallback = useRef2(onClickAway);
  useEffect3(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect3(() => {
    const handler = (event) => {
      const { current: el } = ref;
      el && !el.contains(event.target) && savedCallback.current(event);
    };
    for (const eventName of events) {
      (0, import_sh_utils.on)(document, eventName, handler);
    }
    return () => {
      for (const eventName of events) {
        (0, import_sh_utils.off)(document, eventName, handler);
      }
    };
  }, [events, ref]);
};
var useClickAway_default = useClickAway;

// src/useEffectOnce.ts
init_esm_shims();
import { useEffect as useEffect4 } from "react";
var useEffectOnce = (effect) => {
  useEffect4(effect, []);
};
var useEffectOnce_default = useEffectOnce;

// src/useHover.ts
init_esm_shims();
import * as React from "react";
var { useState, useMemo } = React;
var useHover = () => {
  const [hovered, setHovered] = useState(false);
  const eventHandlers = useMemo(() => ({
    onMouseOver() {
      setHovered(true);
    },
    onMouseOut() {
      setHovered(false);
    }
  }), []);
  return [hovered, eventHandlers];
};
var useHover_default = useHover;

// src/useMount.ts
init_esm_shims();
var useMount = (fn) => {
  useEffectOnce_default(() => {
    fn();
  });
};
var useMount_default = useMount;

// src/useRafState.ts
init_esm_shims();
import { useCallback as useCallback2, useRef as useRef4, useState as useState2 } from "react";

// src/useUnmount.ts
init_esm_shims();
import { useRef as useRef3 } from "react";
var useUnmount = (fn) => {
  const fnRef = useRef3(fn);
  fnRef.current = fn;
  useEffectOnce_default(() => () => fnRef.current());
};
var useUnmount_default = useUnmount;

// src/useRafState.ts
var useRafState = (initialState) => {
  const frame = useRef4(0);
  const [state, setState] = useState2(initialState);
  const setRafState = useCallback2((value) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);
  useUnmount_default(() => {
    cancelAnimationFrame(frame.current);
  });
  return [state, setRafState];
};
var useRafState_default = useRafState;

// src/useWindowSize.ts
init_esm_shims();
import { useEffect as useEffect5 } from "react";
var import_sh_utils2 = __toESM(require_dist());
var useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState_default({
    width: import_sh_utils2.isBrowser ? window.innerWidth : initialWidth,
    height: import_sh_utils2.isBrowser ? window.innerHeight : initialHeight
  });
  useEffect5(() => {
    if (import_sh_utils2.isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      (0, import_sh_utils2.on)(window, "resize", handler);
      return () => {
        (0, import_sh_utils2.off)(window, "resize", handler);
      };
    }
  }, []);
  return state;
};
var useWindowSize_default = useWindowSize;

// src/useMediaQuery.ts
init_esm_shims();
import { useState as useState3, useEffect as useEffect6 } from "react";
var useMediaQuery = (query) => {
  const [matches, setMatches] = useState3(false);
  useEffect6(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};
var useMediaQuery_default = useMediaQuery;

// src/useRect.ts
init_esm_shims();
import { useCallback as useCallback3, useState as useState4 } from "react";
var useRect = () => {
  const [dimensions, setDimensions] = useState4();
  const ref = useCallback3((node) => {
    if (node) {
      setDimensions(node.getBoundingClientRect());
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length) {
          setDimensions(entries[0].target.getBoundingClientRect());
        }
      });
      resizeObserver.observe(node);
      return () => {
        resizeObserver.unobserve(node);
        resizeObserver.disconnect();
      };
    }
  }, []);
  return [ref, dimensions];
};
var useRect_default = useRect;
export {
  useClickAway_default as useClickAway,
  useDebounce,
  useEffectOnce_default as useEffectOnce,
  useHover_default as useHover,
  useMediaQuery_default as useMediaQuery,
  useMount_default as useMount,
  useRafState_default as useRafState,
  useRect_default as useRect,
  useTimeoutFn,
  useUnmount_default as useUnmount,
  useWindowSize_default as useWindowSize
};
