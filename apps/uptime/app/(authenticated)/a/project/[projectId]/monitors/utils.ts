// Types
import type { MonitorCardVariant } from "@basestack/ui";
// Utils
import dayjs from "dayjs";

export const getMonitorCheckStatus = (
  t: (key: any) => string,
  isEnabled: boolean,
  status: string = "N/A",
  responseTime: number = 0,
  statusCode: number = 0
) => {
  const statusVariantMap: Record<string, MonitorCardVariant> = {
    UP: "success",
    DOWN: "danger",
    DEGRADED: "warning",
    MAINTENANCE: "warning",
    UNKNOWN: "default",
    TIMEOUT: "danger",
    ERROR: "danger",
  };

  const getStatusVariant = (s: string): MonitorCardVariant =>
    statusVariantMap[s] ?? "default";

  const getLatencyVariant = (latency: number): MonitorCardVariant => {
    if (latency <= 0) return "default";
    if (latency <= 200) return "success";
    if (latency <= 500) return "warning";
    return "danger";
  };

  const getStatusCodeVariant = (code: number): MonitorCardVariant => {
    if (code === 0) return "default";
    return code >= 400 ? "danger" : "success";
  };

  return [
    {
      label: t("monitor.list.card.description.status"),
      text: isEnabled ? status : t("monitor.list.card.description.paused"),
      variant: getStatusVariant(status),
    },
    {
      label: t("monitor.list.card.description.latency"),
      text: responseTime > 0 ? `${responseTime}ms` : "N/A",
      variant: getLatencyVariant(responseTime),
    },
    {
      label: t("monitor.list.card.description.code"),
      text: statusCode > 0 ? `${statusCode}` : "N/A",
      variant: getStatusCodeVariant(statusCode),
    },
  ];
};

export const getMonitorDescription = (
  t: (key: any) => string,
  isEnabled: boolean,
  name: string,
  type: string,
  nextScheduleTime: string
) => {
  return [
    { text: name },
    { text: type },
    ...(!isEnabled
      ? [{ text: t("monitor.list.card.description.paused") }]
      : [
          {
            text: t("monitor.list.card.description.next-run"),
            label: nextScheduleTime ? dayjs(nextScheduleTime).fromNow() : "N/A",
          },
        ]),
  ];
};

export const getMonitorIcons = (
  t: (key: any) => string,
  uptimePercentage: number,
  errorCount: number
) => {
  return [
    {
      icon: "error",
      text: errorCount.toString(),
      tooltip: t("monitor.list.card.icon.errors"),
    },
    {
      icon: "timer",
      text: uptimePercentage ? `${uptimePercentage}%` : "N/A",
      tooltip: t("monitor.list.card.icon.uptime"),
    },
  ];
};
