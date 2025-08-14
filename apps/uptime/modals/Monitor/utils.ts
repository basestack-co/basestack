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
