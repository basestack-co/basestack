"use client";

import { useMemo } from "react";
// Design System
import {
  Pagination,
  ButtonVariant,
  Box,
  Flex,
  Text,
  Skeleton,
} from "@basestack/design-system";
import { MonitorCard, Toolbar } from "@basestack/ui";
import { useTheme } from "styled-components";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
import { PageContainer } from "../../../styles";
import { Grid } from "./styles";

const ProjectMonitorsPage = () => {
  const { spacing } = useTheme();
  const { projectId } = useParams<{ projectId: string }>();

  const { data, fetchNextPage, isLoading } =
    api.projectMonitors.list.useInfiniteQuery(
      { projectId, limit: 10, search: "" },
      {
        enabled: !!projectId,
        getNextPageParam: (last) => last.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 30_000,
      },
    );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * 10, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  const menuItems = [
    { icon: "edit", text: "Edit", onClick: () => {} },
    {
      icon: "delete",
      text: "Delete",
      variant: ButtonVariant.Danger,
      onClick: () => {},
    },
  ];

  /*
  if ((data?.pages?.[0]?.total ?? 0) <= 0) {
    return (
      <PageContainer>
        <Empty
          iconName="monitor"
          title="No monitors yet"
          description="Create your first monitor to start tracking uptime and response times."
        />
      </PageContainer>
    );
  }
   */

  return (
    <PageContainer>
      <Flex flexDirection="column" gap={spacing.s5}>
        <Box>
          <Text size="xLarge" mr={spacing.s5}>
            Monitoring
          </Text>
        </Box>

        <Toolbar
          search={{
            placeholder: "Search monitors",
            value: "",
            isDisabled: true,
            onChange: () => {},
            onClear: () => {},
          }}
          filter={{
            isDisabled: true,
            text: "Filter",
            items: [{ text: "Demo", onClick: () => {} }],
          }}
          sort={{
            isDisabled: true,
            text: "Sort",
            items: [{ text: "Demo", onClick: () => {} }],
          }}
          popup={{
            isDisabled: true,
            text: "Export",
            items: [{ text: "Demo", onClick: () => {} }],
          }}
          secondaryAction={{
            isDisabled: true,
            text: "Activity",
            icon: "history",
            onClick: () => {},
          }}
          primaryAction={{
            isDisabled: true,
            text: "Create monitor",
            icon: "add",
            onClick: () => {},
          }}
        />

        {isLoading ? (
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
        ) : (
          <Grid>
            <MonitorCard
              onClick={() => {}}
              menuItems={menuItems}
              title="example.google.com"
              labels={[
                { text: "Google" },
                { text: "HTTPS" },
                { text: "Next sync in", label: "45ms" },
              ]}
              data={[
                { label: "status", text: "Up", variant: "success" },
                { label: "latency", text: "400ms", variant: "danger" },
                { label: "cpu", text: "99%", variant: "danger" },
              ]}
              icons={[
                { icon: "error", text: "1", tooltip: "some random text" },
                { icon: "timer", text: "70%", tooltip: "some random text" },
              ]}
            />
            <MonitorCard
              onClick={() => {}}
              menuItems={menuItems}
              title="example.google.com"
              labels={[
                { text: "Google" },
                { text: "HTTPS" },
                { text: "Next sync in", label: "1m 45ms" },
              ]}
              data={[
                { label: "status", text: "Up", variant: "success" },
                { label: "latency", text: "N/A", variant: "danger" },
                { label: "Http code", text: "404", variant: "danger" },
              ]}
              icons={[
                { icon: "error", text: "1", tooltip: "some random text" },
                {
                  icon: "timer",
                  text: "40%",
                  variant: "danger",
                  tooltip: "some random text",
                },
              ]}
            />
            <MonitorCard
              onClick={() => {}}
              menuItems={menuItems}
              title="example.google.com"
              labels={[
                { text: "Google" },
                { text: "Agent" },
                { text: "Sync pause" },
              ]}
              data={[
                { label: "status", text: "Paused" },
                { label: "latency", text: "200ms", variant: "warning" },
                { label: "Http code", text: "200" },
              ]}
              icons={[
                { icon: "error", text: "1", tooltip: "some random text" },
                {
                  icon: "timer",
                  text: "100%",
                  variant: "success",
                  tooltip: "some random text",
                },
              ]}
            />
          </Grid>
        )}
      </Flex>

      <Box mt="auto" pt={spacing.s5}>
        <Flex justifyContent="center">
          <Pagination
            onClick={fetchNextPage}
            currentPage={currentPage >= totalPages ? totalPages : currentPage}
            totalPages={totalPages}
            isLoading={false}
          />
        </Flex>
      </Box>
    </PageContainer>
  );
};

export default ProjectMonitorsPage;
