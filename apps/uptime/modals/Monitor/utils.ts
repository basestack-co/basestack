export const methods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "HEAD",
  "OPTIONS",
] as const;

export const defaultRegions = [
  { value: "us-east-1", label: "US East" },
  { value: "eu-west-1", label: "EU West" },
  { value: "ap-south-1", label: "AP South" },
];

export const defaultIntervalChecks = [
  {
    value: "*/30 * * * * *",
    label: "Every 30 seconds",
  },
  {
    value: "* * * * *",
    label: "Every minute",
  },
  {
    value: "*/3 * * * *",
    label: "Every 3 minutes",
  },
  {
    value: "*/5 * * * *",
    label: "Every 5 minutes",
  },
  {
    value: "*/15 * * * *",
    label: "Every 15 minutes",
  },
  {
    value: "*/30 * * * *",
    label: "Every 30 minutes",
  },
  {
    value: "0 * * * *",
    label: "Every hour",
  },
  {
    value: "0 */2 * * *",
    label: "Every 2 hours",
  },
];
