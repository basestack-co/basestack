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
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo, useState } from "react";
// Store
import { useStore } from "store";
import { useTheme } from "styled-components";
// Server
import { api } from "utils/trpc/react";
// Hooks
import { useDebounce } from "react-use";
// Styles
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
  const { spacing } = useTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const [orderBy, setOrderBy] = useState("desc");
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
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

  const { data, fetchNextPage, isLoading } =
    api.projectMonitors.list.useInfiniteQuery(
      { projectId, limit: 10, search, orderBy },
      {
        enabled: !!projectId,
        getNextPageParam: (last) => last.nextCursor,
        refetchOnWindowFocus: true,
        staleTime: 30_000,
      }
    );

  const [currentPage, totalPages] = useMemo(() => {
    return [
      (data?.pages.length ?? 0) * numberOfFlagsPerPage,
      data?.pages?.[0]?.total ?? 0,
    ];
  }, [data]);

  const onSelectSort = useCallback((value: SelectedSort | null) => {
    setOrderBy(
      value === SelectedSort.NEWEST || value === null ? "desc" : "asc"
    );
  }, []);

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
        text: selectedSort ?? t("monitor.toolbar.sort.text"),
        items: [
          {
            text: t("monitor.toolbar.sort.newest"),
            onClick: () => {
              onSelectSort(SelectedSort.NEWEST);
              setSelectedSort(t("monitor.toolbar.sort.newest"));
            },
          },
          {
            text: t("monitor.toolbar.sort.oldest"),
            onClick: () => {
              onSelectSort(SelectedSort.OLDEST);
              setSelectedSort(t("monitor.toolbar.sort.oldest"));
            },
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
  }, [
    isLoading,
    t,
    setCreateMonitorModalOpen,
    searchValue,
    onSelectSort,
    selectedSort,
  ]);

  const onRenderMenuActions = useCallback(
    (isEnabled: boolean) => {
      return [
        {
          icon: isEnabled ? "pause" : "resume",
          text: isEnabled
            ? t("monitor.list.card.action.pause")
            : t("monitor.list.card.action.resume"),
          onClick: () => {},
        },
        {
          icon: "siren",
          text: t("monitor.list.card.action.incidents"),
          onClick: () => {},
        },
        {
          icon: "settings",
          text: t("monitor.list.card.action.settings"),
          onClick: () => {},
        },
        {
          icon: "delete",
          text: t("monitor.list.card.action.delete"),
          variant: ButtonVariant.Danger,
          onClick: () => {},
        },
      ];
    },
    [t]
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
          iconName="monitor"
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
                  return (
                    <MonitorCard
                      key={id}
                      onClick={() => {}}
                      menuItems={onRenderMenuActions(isEnabled)}
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
  }, [totalPages, isLoading, data, onRenderMenuActions, spacing, t]);

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
