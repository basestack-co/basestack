var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
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

// index.ts
var sh_hooks_exports = {};
__export(sh_hooks_exports, {
  useDebounce: () => useDebounce,
  useTimeoutFn: () => useTimeoutFn,
});

// useDebounce.ts
var import_react2 = require("react");

// useTimeoutFn.ts
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

// useDebounce.ts
function useDebounce(fn, ms = 0, deps = []) {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  (0, import_react2.useEffect)(reset, deps);
  return [isReady, cancel];
}
module.exports = __toCommonJS(sh_hooks_exports);
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    useDebounce,
    useTimeoutFn,
  });
