var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return (
      (cache && cache.get(module2)) ||
      ((temp = __reExport(__markAsModule({}), module2, 1)),
      cache && cache.set(module2, temp),
      temp)
    );
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// ../../node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "../../node_modules/tsup/assets/cjs_shims.js"() {},
});

// ../sh-utils/dist/index.js
var require_dist = __commonJS({
  "../sh-utils/dist/index.js"(exports, module2) {
    init_cjs_shims();
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __markAsModule2 = (target) =>
      __defProp2(target, "__esModule", { value: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __reExport2 = (target, module22, copyDefault, desc) => {
      if (
        (module22 && typeof module22 === "object") ||
        typeof module22 === "function"
      ) {
        for (let key of __getOwnPropNames2(module22))
          if (
            !__hasOwnProp2.call(target, key) &&
            (copyDefault || key !== "default")
          )
            __defProp2(target, key, {
              get: () => module22[key],
              enumerable:
                !(desc = __getOwnPropDesc2(module22, key)) || desc.enumerable,
            });
      }
      return target;
    };
    var __toCommonJS2 = /* @__PURE__ */ ((cache) => {
      return (module22, temp) => {
        return (
          (cache && cache.get(module22)) ||
          ((temp = __reExport2(__markAsModule2({}), module22, 1)),
          cache && cache.set(module22, temp),
          temp)
        );
      };
    })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
    var src_exports2 = {};
    __export2(src_exports2, {
      isBrowser: () => isBrowser2,
      off: () => off3,
      on: () => on3,
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
    module2.exports = __toCommonJS2(src_exports2);
  },
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useClickAway: () => useClickAway_default,
  useDebounce: () => useDebounce,
  useEffectOnce: () => useEffectOnce_default,
  useHover: () => useHover_default,
  useMediaQuery: () => useMediaQuery_default,
  useMount: () => useMount_default,
  useRafState: () => useRafState_default,
  useRect: () => useRect_default,
  useTimeoutFn: () => useTimeoutFn,
  useUnmount: () => useUnmount_default,
  useWindowSize: () => useWindowSize_default,
});
init_cjs_shims();

// src/useDebounce.ts
init_cjs_shims();
var import_react2 = require("react");

// src/useTimeoutFn.ts
init_cjs_shims();
var import_react = require("react");
function useTimeoutFn(fn, ms = 0) {
  const ready = (0, import_react.useRef)(false);
  const timeout = (0, import_react.useRef)();
  const callback = (0, import_react.useRef)(fn);
  const isReady = (0, import_react.useCallback)(() => ready.current, []);
  const set = (0, import_react.useCallback)(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);
  const clear = (0, import_react.useCallback)(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);
  (0, import_react.useEffect)(() => {
    callback.current = fn;
  }, [fn]);
  (0, import_react.useEffect)(() => {
    set();
    return clear;
  }, [ms]);
  return [isReady, clear, set];
}

// src/useDebounce.ts
function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  (0, import_react2.useEffect)(reset, deps);
  return [isReady, cancel];
}

// src/useClickAway.ts
init_cjs_shims();
var import_react3 = require("react");
var import_sh_utils = __toESM(require_dist());
var defaultEvents = ["click"];
var useClickAway = (ref, onClickAway, events = defaultEvents) => {
  const savedCallback = (0, import_react3.useRef)(onClickAway);
  (0, import_react3.useEffect)(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  (0, import_react3.useEffect)(() => {
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
init_cjs_shims();
var import_react4 = require("react");
var useEffectOnce = (effect) => {
  (0, import_react4.useEffect)(effect, []);
};
var useEffectOnce_default = useEffectOnce;

// src/useHover.ts
init_cjs_shims();
var React = __toESM(require("react"));
var { useState, useMemo } = React;
var useHover = () => {
  const [hovered, setHovered] = useState(false);
  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    []
  );
  return [hovered, eventHandlers];
};
var useHover_default = useHover;

// src/useMount.ts
init_cjs_shims();
var useMount = (fn) => {
  useEffectOnce_default(() => {
    fn();
  });
};
var useMount_default = useMount;

// src/useRafState.ts
init_cjs_shims();
var import_react6 = require("react");

// src/useUnmount.ts
init_cjs_shims();
var import_react5 = require("react");
var useUnmount = (fn) => {
  const fnRef = (0, import_react5.useRef)(fn);
  fnRef.current = fn;
  useEffectOnce_default(() => () => fnRef.current());
};
var useUnmount_default = useUnmount;

// src/useRafState.ts
var useRafState = (initialState) => {
  const frame = (0, import_react6.useRef)(0);
  const [state, setState] = (0, import_react6.useState)(initialState);
  const setRafState = (0, import_react6.useCallback)((value) => {
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
init_cjs_shims();
var import_react7 = require("react");
var import_sh_utils2 = __toESM(require_dist());
var useWindowSize = (initialWidth = Infinity, initialHeight = Infinity) => {
  const [state, setState] = useRafState_default({
    width: import_sh_utils2.isBrowser ? window.innerWidth : initialWidth,
    height: import_sh_utils2.isBrowser ? window.innerHeight : initialHeight,
  });
  (0, import_react7.useEffect)(() => {
    if (import_sh_utils2.isBrowser) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
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
init_cjs_shims();
var import_react8 = require("react");
var useMediaQuery = (query) => {
  const [matches, setMatches] = (0, import_react8.useState)(false);
  (0, import_react8.useEffect)(() => {
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
init_cjs_shims();
var import_react9 = require("react");
var useRect = () => {
  const [dimensions, setDimensions] = (0, import_react9.useState)();
  const ref = (0, import_react9.useCallback)((node) => {
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
module.exports = __toCommonJS(src_exports);
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
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
  });
