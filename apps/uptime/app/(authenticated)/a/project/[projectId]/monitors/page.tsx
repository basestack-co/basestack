"use client";

import { useMemo, useCallback, Fragment } from "react";
// Design System
import {
  Pagination,
  ButtonVariant,
  Box,
  Flex,
  Text,
  Skeleton,
  Empty,
} from "@basestack/design-system";
import { MonitorCard, Toolbar } from "@basestack/ui";
import { useTheme } from "styled-components";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// Store
import { useStore } from "store";
// Styles
import { PageContainer } from "../../../styles";
import { Grid } from "./styles";
// Locales
import { useTranslations } from "next-intl";
// Utils
import {
  getMonitorCheckStatus,
  getMonitorDescription,
  getMonitorIcons,
} from "./utils";

const numberOfFlagsPerPage = 10;

const ProjectMonitorsPage = () => {
  const t = useTranslations();
  const { spacing } = useTheme();
  const { projectId } = useParams<{ projectId: string }>();

  const setCreateMonitorModalOpen = useStore(
    (state) => state.setCreateMonitorModalOpen
  );

  const { data, fetchNextPage, isLoading } =
    api.projectMonitors.list.useInfiniteQuery(
      { projectId, limit: 10, search: "" },
      {
        enabled: !!projectId,
        getNextPageParam: (last) => last.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 30_000,
      }
    );

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
        value: "",
        isDisabled: isLoading,
        onChange: () => {},
        onClear: () => {},
      },
      filter: {
        isDisabled: isLoading,
        text: t("monitor.toolbar.filter.text"),
        items: [{ text: "Demo", onClick: () => {} }],
      },
      sort: {
        isDisabled: isLoading,
        text: t("monitor.toolbar.sort.text"),
        items: [{ text: "Demo", onClick: () => {} }],
      },
      primaryAction: {
        isDisabled: isLoading,
        text: t("monitor.toolbar.create.text"),
        icon: "add",
        onClick: () => setCreateMonitorModalOpen({ isOpen: true }),
      },
    };
  }, [isLoading, t, setCreateMonitorModalOpen]);

  const onRenderMenuActions = useCallback(() => {
    return [
      {
        icon: "edit",
        text: t("monitor.list.card.action.edit"),
        onClick: () => {},
      },
      {
        icon: "delete",
        text: t("monitor.list.card.action.delete"),
        variant: ButtonVariant.Danger,
        onClick: () => {},
      },
    ];
  }, [t]);

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
                  return (
                    <MonitorCard
                      key={id}
                      onClick={() => {}}
                      menuItems={onRenderMenuActions()}
                      title={config?.url ?? "N/A"}
                      labels={getMonitorDescription(
                        t,
                        isEnabled,
                        name,
                        type,
                        _count.checks <= 0 ? "" : nextScheduleTime
                      )}
                      data={getMonitorCheckStatus(
                        t,
                        isEnabled,
                        latestCheck?.status ?? "N/A",
                        latestCheck?.responseTime ?? 0,
                        latestCheck?.statusCode ?? 0
                      )}
                      icons={getMonitorIcons(t, uptimePercentage, errorCount)}
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
        <Toolbar {...getToolbarProps()} />
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
