// src/index.ts
function on(obj, ...args) {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...args);
  }
}
function off(obj, ...args) {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...args);
  }
}
var isBrowser = typeof window !== "undefined";
export {
  isBrowser,
  off,
  on
};
