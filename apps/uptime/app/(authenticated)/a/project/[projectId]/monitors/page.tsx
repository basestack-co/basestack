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

const numberOfFlagsPerPage = 10;

const ProjectMonitorsPage = () => {
  const t = useTranslations("monitor");
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
        placeholder: t("toolbar.search.placeholder"),
        value: "",
        isDisabled: isLoading,
        onChange: () => {},
        onClear: () => {},
      },
      filter: {
        isDisabled: isLoading,
        text: t("toolbar.filter.text"),
        items: [{ text: "Demo", onClick: () => {} }],
      },
      sort: {
        isDisabled: isLoading,
        text: t("toolbar.sort.text"),
        items: [{ text: "Demo", onClick: () => {} }],
      },
      primaryAction: {
        isDisabled: isLoading,
        text: t("toolbar.create.text"),
        icon: "add",
        onClick: () => setCreateMonitorModalOpen({ isOpen: true }),
      },
    };
  }, [isLoading, t, setCreateMonitorModalOpen]);

  const onRenderMenuActions = useCallback(() => {
    return [
      { icon: "edit", text: t("list.card.action.edit"), onClick: () => {} },
      {
        icon: "delete",
        text: t("list.card.action.delete"),
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
          title={t("list.empty.title")}
          description={t("list.empty.description")}
        />
      );
    }

    return (
      <Grid>
        {data?.pages.map(({ monitors }, index) => {
          return (
            <Fragment key={index}>
              {monitors.map(({ id, name, type, config, latestCheck }) => {
                //   console.log("config", config);
                console.log("latestCheck", latestCheck);

                return (
                  <MonitorCard
                    key={id}
                    onClick={() => {}}
                    menuItems={onRenderMenuActions()}
                    title={config?.url ?? "N/A"}
                    labels={[
                      { text: name },
                      { text: type },
                      { text: "Next sync in", label: "45ms" },
                    ]}
                    data={[
                      {
                        label: "status",
                        text: latestCheck?.status ?? "N/A",
                        variant: "success",
                      },
                      {
                        label: "latency",
                        text: latestCheck?.responseTime
                          ? `${latestCheck.responseTime}ms`
                          : "N/A",
                        variant: "danger",
                      },
                      {
                        label: "code",
                        text: latestCheck?.statusCode
                          ? `${latestCheck.statusCode}`
                          : "N/A",
                        variant: "danger",
                      },
                    ]}
                    icons={[
                      { icon: "error", text: "1", tooltip: "some random text" },
                      {
                        icon: "timer",
                        text: "70%",
                        tooltip: "some random text",
                      },
                    ]}
                  />
                );
              })}
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
            {t("page.title")}
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
