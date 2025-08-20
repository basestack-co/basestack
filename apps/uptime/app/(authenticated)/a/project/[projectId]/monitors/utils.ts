// Types
import type { MonitorCardVariant } from "@basestack/ui";
import type { LabelProps } from "@basestack/design-system";
import type { MonitorStatus } from ".prisma/client";
// Utils
import cronstrue from "cronstrue";
import dayjs from "dayjs";

const STATUS_VARIANT_MAP: Record<MonitorStatus | "PAUSED", MonitorCardVariant> =
  {
    UP: "success",
    DOWN: "danger",
    DEGRADED: "warning",
    MAINTENANCE: "warning",
    UNKNOWN: "default",
    TIMEOUT: "danger",
    ERROR: "danger",
    PAUSED: "default",
  } as const;

const LATENCY_THRESHOLDS = {
  EXCELLENT: 200,
  GOOD: 500,
} as const;

const STATUS_CODE_RANGES = {
  ERROR_START: 400,
} as const;

export interface MonitorCheckStatusItem {
  label: string;
  text: string;
  variant: MonitorCardVariant;
}

export interface MonitorCheckStatusParams {
  t: (key: any) => string;
  isEnabled: boolean;
  isPending: boolean;
  status: MonitorStatus | "N/A";
  responseTime: number;
  statusCode: number;
}

export interface MonitorDescriptionParams {
  t: (key: any) => string;
  isEnabled: boolean;
  isPending: boolean;
  name: string;
  type: string;
  nextScheduleTime: string;
}

export interface MonitorIconsParams {
  t: (key: any) => string;
  uptimePercentage: number;
  errorCount: number;
  cron: string;
  timezone: string;
}

const getStatusVariant = (
  status: MonitorStatus | "PAUSED" | "N/A"
): MonitorCardVariant => {
  if (status === "N/A") return "default";
  return (
    STATUS_VARIANT_MAP[status as keyof typeof STATUS_VARIANT_MAP] ?? "default"
  );
};

const getLatencyVariant = (latency: number): MonitorCardVariant => {
  if (latency <= 0) return "default";
  if (latency <= LATENCY_THRESHOLDS.EXCELLENT) return "success";
  if (latency <= LATENCY_THRESHOLDS.GOOD) return "warning";
  return "danger";
};

const getStatusCodeVariant = (code: number): MonitorCardVariant => {
  if (code === 0) return "default";
  return code >= STATUS_CODE_RANGES.ERROR_START ? "danger" : "success";
};

const formatResponseTime = (responseTime: number): string => {
  return responseTime > 0 ? `${responseTime}ms` : "N/A";
};

const formatStatusCode = (statusCode: number): string => {
  return statusCode > 0 ? statusCode.toString() : "N/A";
};

const getStatusText = (
  t: (key: string) => string,
  isEnabled: boolean,
  isPending: boolean,
  status: MonitorStatus | "N/A"
): string => {
  if (!isEnabled) {
    return t("monitor.list.card.description.paused");
  }

  if (isPending) {
    return t("monitor.list.card.description.pending");
  }

  return status;
};

export const getMonitorCheckStatus = ({
  t,
  isEnabled,
  isPending,
  status = "N/A",
  responseTime = 0,
  statusCode = 0,
}: MonitorCheckStatusParams): MonitorCheckStatusItem[] => {
  const effectiveStatus = !isEnabled ? "PAUSED" : status;

  return [
    {
      label: t("monitor.list.card.description.status"),
      text: getStatusText(t, isEnabled, isPending, status),
      variant: getStatusVariant(effectiveStatus),
    },
    {
      label: t("monitor.list.card.description.latency"),
      text: formatResponseTime(responseTime),
      variant: getLatencyVariant(responseTime),
    },
    {
      label: t("monitor.list.card.description.code"),
      text: formatStatusCode(statusCode),
      variant: getStatusCodeVariant(statusCode),
    },
  ];
};

export const getMonitorDescription = ({
  t,
  isEnabled,
  isPending,
  name,
  type,
  nextScheduleTime,
}: MonitorDescriptionParams) => {
  const baseItems = [{ text: name }, { text: type }];

  if (!isEnabled) {
    return [...baseItems, { text: t("monitor.list.card.description.paused") }];
  }

  const scheduleLabel = nextScheduleTime
    ? dayjs(nextScheduleTime).fromNow()
    : "";

  const statusItem = {
    text: isPending
      ? t("monitor.list.card.description.awaiting-first-run")
      : t("monitor.list.card.description.next-run"),
    ...(scheduleLabel && { label: scheduleLabel }),
  };

  return [...baseItems, statusItem];
};

export const getMonitorIcons = ({
  t,
  uptimePercentage,
  errorCount,
  cron,
  timezone,
}: MonitorIconsParams) => {
  const getUptimeVariant = (uptime: number): LabelProps["variant"] => {
    if (uptime === 0) return "default";
    if (uptime >= 90) return "success";
    if (uptime >= 70) return "warning";

    return "danger";
  };

  return [
    {
      icon: "timer",
      text:
        typeof uptimePercentage === "number" && uptimePercentage >= 0
          ? `${uptimePercentage}%`
          : "N/A",
      tooltip: t("monitor.list.card.icon.uptime"),
      variant: getUptimeVariant(uptimePercentage),
    },
    {
      icon: "error",
      text:
        typeof errorCount === "number" && errorCount >= 0
          ? errorCount.toString()
          : "0",
      tooltip: t("monitor.list.card.icon.errors"),
      variant: errorCount > 0 ? ("danger" as LabelProps["variant"]) : undefined,
    },
    ...(cron
      ? [
          {
            icon: "calendar_clock",
            tooltip: `${cronstrue.toString(cron)} (${timezone})`,
          },
        ]
      : []),
  ];
};
