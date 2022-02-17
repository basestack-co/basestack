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
export {
  off,
  on
};
