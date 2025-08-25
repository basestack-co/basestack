"use client";

// Navigation
import { useParams, useRouter } from "next/navigation";
// React
import { type ReactNode, useState, useMemo, useCallback } from "react";
// Styles
import { useTheme } from "styled-components";
// Components
import { DetailsHeader, type DetailsHeaderItem } from "@basestack/ui";
import { Box, ButtonVariant, Flex, Tabs } from "@basestack/design-system";
import OutlinedCard from "@basestack/ui/components/OutlinedCard";
// Server
import { api } from "utils/trpc/react";
// Locales
import { useTranslations } from "next-intl";
// Toast
import { toast } from "sonner";
// Types
import type { MonitorStatus } from ".prisma/client";
// Utils
import dayjs from "dayjs";
import cronstrue from "cronstrue";
import {
  getStatusVariant,
  formatResponseTime,
  getLatencyVariant,
  getStatusCodeVariant,
  formatStatusCode,
} from "../utils";

const MonitorLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const theme = useTheme();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const { monitorId, projectId } = useParams<{
    monitorId: string;
    projectId: string;
  }>();

  const [activeTab, setActiveTab] = useState({ selected: "general", index: 0 });

  const { data, isLoading } = api.projectMonitors.byId.useQuery({
    projectId,
    monitorId,
  });

  const updateMonitorState = api.projectMonitors.updateState.useMutation();
  const deleteMonitor = api.projectMonitors.delete.useMutation();

  const getDescription: DetailsHeaderItem[] = useMemo(() => {
    if (isLoading || !data?.monitor) return [];

    const { latestCheck, isEnabled, nextScheduleTime } = data.monitor;

    const status = (latestCheck?.status ?? "") as MonitorStatus;
    const responseTime = latestCheck?.responseTime ?? 0;
    const statusCode = latestCheck?.statusCode ?? 0;

    return [
      {
        text: status,
        type: "label",
        labelVariant: getStatusVariant(status),
      },
      {
        icon: "location_on",
        text: data?.monitor?.type ?? "",
        type: "text",
      },
      {
        text: formatResponseTime(responseTime),
        type: "label",
        labelVariant: getLatencyVariant(responseTime),
      },
      {
        text: formatStatusCode(statusCode),
        type: "label",
        labelVariant: getStatusCodeVariant(statusCode),
      },
      {
        icon: "paid",
        text: isEnabled
          ? `Next run ${dayjs(nextScheduleTime).fromNow()}`
          : "Paused",
        type: "text",
      },
    ];
  }, [isLoading, data]);

  const getPanelDetails = useMemo(() => {
    const details = [
      {
        title: t("monitor.details.panel.url"),
        text: data?.monitor?.config?.url || "-",
      },
      {
        title: t("monitor.details.panel.uptime"),
        text:
          typeof data?.monitor?.uptimePercentage === "number" &&
          data?.monitor?.uptimePercentage >= 0
            ? `${data?.monitor?.uptimePercentage}%`
            : "-",
      },
      {
        title: t("monitor.details.panel.total-incidents"),
        text:
          typeof data?.monitor?.errorCount === "number" &&
          data?.monitor?.errorCount >= 0
            ? data?.monitor?.errorCount.toString()
            : "-",
      },
      {
        title: t("monitor.details.panel.check-interval"),
        text: data?.monitor?.config?.cron
          ? `${cronstrue.toString(data?.monitor?.config?.cron)} (${data?.monitor?.config?.timezone})`
          : "-",
      },
      {
        title: t("monitor.details.panel.last-checked"),
        text: data?.monitor?.latestCheck?.checkedAt
          ? dayjs(data?.monitor?.latestCheck?.checkedAt).fromNow()
          : "-",
      },
    ];

    return details.map((item, index) => (
      <OutlinedCard
        key={item.title}
        title={item.title}
        text={item.text}
        hasHorizontalRule={index < details.length - 1}
      />
    ));
  }, [data, t]);

  const getTabs = useMemo(() => {
    return [
      { id: "overview", text: t("monitor.details.tab.overview") },
      { id: "incidents", text: t("monitor.details.tab.incidents") },
      { id: "configuration", text: t("monitor.details.tab.configuration") },
    ];
  }, [t]);

  const onSelectTab = useCallback(
    (selected: string, index: number) => {
      router.push(`/a/project/${projectId}/monitors/${monitorId}/${selected}`);
      setActiveTab({ selected, index });
    },
    [router, projectId, monitorId]
  );

  const createDetailsHeaderProps = useCallback(() => {
    const isEnabled = data?.monitor?.isEnabled;
    const name = data?.monitor?.name ?? "N/A";

    return {
      button: {
        text: isEnabled
          ? t("monitor.details.action.pause")
          : t("monitor.details.action.resume"),
        isDisabled: updateMonitorState.isPending,
        onClick: () => {
          const loadingToastId = toast.loading(
            t("monitor.details.toast.update.loading", {
              name,
            })
          );

          updateMonitorState.mutate(
            {
              projectId,
              monitorId,
              isEnabled: !isEnabled,
            },
            {
              onSuccess: async () => {
                await trpcUtils.projectMonitors.byId.invalidate();
                toast.dismiss(loadingToastId);
                toast.success(t("monitor.details.toast.update.success"));
              },
              onError: (error) => {
                toast.dismiss(loadingToastId);
                toast.error(error.message, { duration: 10000 });
              },
            }
          );
        },
      },
      popup: {
        text: t("monitor.details.action.actions"),
        items: [
          {
            icon: "add",
            text: t("monitor.details.action.new-incident"),
            isDisabled: true,
            onClick: () => "",
          },
          {
            variant: ButtonVariant.Danger,
            icon: "delete",
            text: t("monitor.details.action.delete"),
            isDisabled: deleteMonitor.isPending,
            onClick: () => {
              const loadingToastId = toast.loading(
                t("monitor.details.toast.delete.loading", {
                  name,
                })
              );

              deleteMonitor.mutate(
                {
                  projectId,
                  monitorId,
                },
                {
                  onSuccess: async () => {
                    router.push(`/a/project/${projectId}/monitors`);
                    toast.dismiss(loadingToastId);
                    toast.success(t("monitor.details.toast.delete.success"));
                  },
                  onError: (error) => {
                    toast.dismiss(loadingToastId);
                    toast.error(error.message, { duration: 10000 });
                  },
                }
              );
            },
          },
        ],
      },
    };
  }, [
    data?.monitor,
    t,
    projectId,
    monitorId,
    updateMonitorState,
    trpcUtils,
    deleteMonitor,
    router,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      px={theme.spacing.s5}
      py={theme.spacing.s6}
      maxWidth="1440px"
      width="100%"
      margin="0 auto"
    >
      <Flex flexDirection="column" gap={theme.spacing.s6}>
        <DetailsHeader
          title={data?.monitor?.name ?? "N/A"}
          details={getDescription}
          {...createDetailsHeaderProps()}
        />
        <Tabs
          onSelect={onSelectTab}
          sliderPosition={activeTab.index}
          backgroundColor="transparent"
          variant="compact"
          items={getTabs}
        />
      </Flex>
      <Box mt={theme.spacing.s6}>
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          gap={theme.spacing.s6}
        >
          <Flex flexGrow={1}>{children}</Flex>
          <Box maxWidth="335px" width="100%">
            {getPanelDetails}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MonitorLayout;
