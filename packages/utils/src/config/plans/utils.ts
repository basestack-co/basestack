export const getAppMode = (mode: string) => {
  return (
    ["development", "production", "local"].includes(mode) ? mode : "production"
  ) as "local" | "development" | "production";
};
