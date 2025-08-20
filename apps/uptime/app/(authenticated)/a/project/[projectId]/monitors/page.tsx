"use client";

// Design System
import {
  Box,
  ButtonVariant,
  Empty,
  Flex,
  Pagination,
  Skeleton,
  Text,
} from "@basestack/design-system";
import { MonitorCard, Toolbar } from "@basestack/ui";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo, useState } from "react";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Hooks
import { useDebounce } from "react-use";
// Styles
import { useTheme } from "styled-components";
import { PageContainer } from "../../../styles";
import { Grid } from "./styles";
// Utils
import {
  getMonitorCheckStatus,
  getMonitorDescription,
  getMonitorIcons,
} from "./utils";

const numberOfFlagsPerPage = 10;

export enum SelectedSort {
  NEWEST = "Newest",
  OLDEST = "Oldest",
}

const ProjectMonitorsPage = () => {
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const { spacing } = useTheme();
  const router = useRouter();
  const { projectId } = useParams<{
    projectId: string;
  }>();
  const [selectedSort, setSelectedSort] = useState<string | null>(
    SelectedSort.NEWEST
  );
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [search, setSearch] = useState(searchValue);

  useDebounce(
    () => {
      if (typeof searchValue !== "string") return;
      setSearch(searchValue);
    },
    500,
    [searchValue]
  );

  const setCreateMonitorModalOpen = useStore(
    (state) => state.setCreateMonitorModalOpen
  );

  const orderBy = useMemo(() => {
    return selectedSort === SelectedSort.NEWEST || selectedSort === null
      ? "desc"
      : "asc";
  }, [selectedSort]);

  const { data, fetchNextPage, isLoading } =
    api.projectMonitors.list.useInfiniteQuery(
      {
        projectId,
        limit: 10,
        search,
        orderBy,
      },
      {
        enabled: !!projectId,
        getNextPageParam: (last) => last.nextCursor,
        refetchOnWindowFocus: true,
        staleTime: 30_000,
      }
    );

  const deleteMonitor = api.projectMonitors.delete.useMutation();
  const updateMonitorState = api.projectMonitors.updateState.useMutation();

  const [currentPage, totalPages] = useMemo(() => {
    return [
      (data?.pages.length ?? 0) * numberOfFlagsPerPage,
      data?.pages?.[0]?.total ?? 0,
    ];
  }, [data]);

  const getToolbarProps = useCallback(() => {
    return {
      search: {
        placeholder: t("monitor.toolbar.search.placeholder"),
        value: searchValue ?? "",
        isDisabled: isLoading,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(e.target.value);
        },
        onClear: () => {
          setSearchValue("");
        },
      },
      sort: {
        isDisabled: isLoading,
        text:
          selectedSort === SelectedSort.NEWEST
            ? t("monitor.toolbar.sort.newest")
            : t("monitor.toolbar.sort.oldest"),
        items: [
          {
            text: t("monitor.toolbar.sort.newest"),
            onClick: () => setSelectedSort(SelectedSort.NEWEST),
          },
          {
            text: t("monitor.toolbar.sort.oldest"),
            onClick: () => setSelectedSort(SelectedSort.OLDEST),
          },
        ],
      },
      primaryAction: {
        isDisabled: isLoading,
        text: t("monitor.toolbar.create.text"),
        icon: "add",
        onClick: () => setCreateMonitorModalOpen({ isOpen: true }),
      },
    };
  }, [isLoading, t, setCreateMonitorModalOpen, searchValue, selectedSort]);

  const onRenderMenuActions = useCallback(
    (monitorId: string, isEnabled: boolean, name: string) => {
      const monitorUrl = `/a/project/${projectId}/monitors/${monitorId}`;

      return [
        {
          icon: isEnabled ? "pause" : "resume",
          text: isEnabled
            ? t("monitor.list.card.action.pause")
            : t("monitor.list.card.action.resume"),
          isDisabled: updateMonitorState.isPending,
          onClick: () => {
            const loadingToastId = toast.loading(
              t("monitor.list.card.toast.update.loading", {
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
                  await trpcUtils.projectMonitors.list.invalidate();
                  toast.dismiss(loadingToastId);
                  toast.success(t("monitor.list.card.toast.update.success"));
                },
                onError: (error) => {
                  toast.dismiss(loadingToastId);
                  toast.error(error.message, { duration: 10000 });
                },
              }
            );
          },
        },
        {
          icon: "siren",
          text: t("monitor.list.card.action.incidents"),
          onClick: () => router.push(`${monitorUrl}/incidents`),
        },
        {
          icon: "settings",
          text: t("monitor.list.card.action.settings"),
          onClick: () => router.push(`${monitorUrl}/settings`),
        },
        {
          icon: "delete",
          text: t("monitor.list.card.action.delete"),
          variant: ButtonVariant.Danger,
          isDisabled: deleteMonitor.isPending,
          onClick: () => {
            const loadingToastId = toast.loading(
              t("monitor.list.card.toast.delete.loading", {
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
                  await trpcUtils.projectMonitors.list.invalidate();
                  toast.dismiss(loadingToastId);
                  toast.success(t("monitor.list.card.toast.delete.success"));
                },
                onError: (error) => {
                  toast.dismiss(loadingToastId);
                  toast.error(error.message, { duration: 10000 });
                },
              }
            );
          },
        },
      ];
    },
    [t, router, projectId, deleteMonitor, updateMonitorState, trpcUtils]
  );

  const onRenderCards = useCallback(() => {
    if (isLoading) {
      return (
        <Grid>
          <Skeleton
            numberOfItems={3}
            items={[
              { h: 22, w: "50%", mb: 4 },
              { h: 18, w: "80%", mb: 20 },
              { h: 38, w: "80%", mb: 25 },
              { h: 28, w: "20%", mb: 0 },
            ]}
            padding={spacing.s5}
          />
        </Grid>
      );
    }

    if (totalPages <= 0) {
      return (
        <Empty
          iconName="timer"
          title={t("monitor.list.empty.title")}
          description={t("monitor.list.empty.description")}
        />
      );
    }

    return (
      <Grid>
        {data?.pages.map(({ monitors }, index) => {
          return (
            <Fragment key={index}>
              {monitors.map(
                ({
                  id,
                  name,
                  type,
                  config,
                  latestCheck,
                  nextScheduleTime,
                  isEnabled,
                  uptimePercentage,
                  errorCount,
                  _count,
                }) => {
                  const isPending = _count.checks <= 0;
                  const monitorUrl = `/a/project/${projectId}/monitors/${id}`;

                  return (
                    <MonitorCard
                      key={id}
                      onClick={() => router.push(`${monitorUrl}/general`)}
                      menuItems={onRenderMenuActions(id, isEnabled, name)}
                      title={config?.url ?? "N/A"}
                      labels={getMonitorDescription({
                        t,
                        isEnabled,
                        isPending,
                        name,
                        type,
                        nextScheduleTime: isPending ? "" : nextScheduleTime,
                      })}
                      data={getMonitorCheckStatus({
                        t,
                        isEnabled,
                        isPending,
                        status: latestCheck?.status ?? "N/A",
                        responseTime: latestCheck?.responseTime ?? 0,
                        statusCode: latestCheck?.statusCode ?? 0,
                      })}
                      icons={getMonitorIcons({
                        t,
                        uptimePercentage,
                        errorCount,
                        timezone: config?.timezone ?? "UTC",
                        cron: config?.cron ?? "",
                      })}
                    />
                  );
                }
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }, [
    totalPages,
    isLoading,
    data,
    onRenderMenuActions,
    spacing,
    t,
    router,
    projectId,
  ]);

  return (
    <PageContainer>
      <Flex flexDirection="column" gap={spacing.s5}>
        <Box>
          <Text size="xLarge" mr={spacing.s5}>
            {t("monitor.page.title")}
          </Text>
        </Box>
        <Toolbar breakpoint="xs" {...getToolbarProps()} />
        {onRenderCards()}
      </Flex>

      <Box mt="auto" pt={spacing.s5}>
        <Flex justifyContent="center">
          <Pagination
            onClick={fetchNextPage}
            currentPage={currentPage >= totalPages ? totalPages : currentPage}
            totalPages={totalPages}
            isLoading={isLoading}
          />
        </Flex>
      </Box>
    </PageContainer>
  );
};

export default ProjectMonitorsPage;
