export const queryBuilder = (params: {}) => {
  const esc = encodeURIComponent;

  return Object.keys(params)
    .filter(
      (key) => params[key] !== undefined && params[key] && params[key] !== null,
    )
    .map((key) => esc(key) + "=" + esc(params[key]))
    .join("&");
};
