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

export const getIntervalOptions = (t: (key: any) => string) => {
  return [
    {
      value: "* * * * *",
      label: t("modal.monitor.form.input.interval.option.every-minute"),
    },
    {
      value: "*/3 * * * *",
      label: t("modal.monitor.form.input.interval.option.every-3-minutes"),
    },
    {
      value: "*/5 * * * *",
      label: t("modal.monitor.form.input.interval.option.every-5-minutes"),
    },
    {
      value: "*/15 * * * *",
      label: t("modal.monitor.form.input.interval.option.every-15-minutes"),
    },
    {
      value: "*/30 * * * *",
      label: t("modal.monitor.form.input.interval.option.every-30-minutes"),
    },
    {
      value: "0 * * * *",
      label: t("modal.monitor.form.input.interval.option.every-hour"),
    },
    {
      value: "0 */2 * * *",
      label: t("modal.monitor.form.input.interval.option.every-2-hours"),
    },
  ];
};
