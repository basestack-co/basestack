"use client";

// Design System
import {
  Card,
  CardVariant,
  Empty,
  Flex,
  Label,
  Pagination,
  Text,
} from "@basestack/design-system";
// Router
import { useParams } from "next/navigation";
// Locales
import { useMemo } from "react";
import styled from "styled-components";
// Server
import { api } from "utils/trpc/react";

const MonitorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${({ theme }) => theme.spacing.s5};

  @media screen and ${({ theme }) => theme.device.max.lg} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and ${({ theme }) => theme.device.max.sm} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const ProjectMonitorsPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { data, fetchNextPage } = api.projectMonitors.list.useInfiniteQuery(
    { projectId, limit: 10, search: "" },
    { enabled: !!projectId, getNextPageParam: (last) => last.nextCursor },
  );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * 10, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  const getVariantFromStatus = (status?: string | null) => {
    switch (status) {
      case "UP":
        return CardVariant.SUCCESS;
      case "DEGRADED":
        return CardVariant.WARNING;
      case "DOWN":
      case "ERROR":
      case "TIMEOUT":
        return CardVariant.DANGER;
      case "MAINTENANCE":
        return CardVariant.PRIMARY;
      default:
        return CardVariant.DEFAULT;
    }
  };

  if ((data?.pages?.[0]?.total ?? 0) <= 0) {
    return (
      <Empty
        iconName="monitor"
        title="No monitors yet"
        description="Create your first monitor to start tracking uptime and response times."
      />
    );
  }

  return (
    <Flex flexDirection="column" gap={16} style={{ padding: "24px 20px" }}>
      <MonitorsGrid>
        {data?.pages
          .flatMap((p) => p.monitors)
          .map((monitor) => {
            const latest = monitor.latestCheck;
            const variant = getVariantFromStatus(latest?.status ?? null);

            return (
              <Card key={monitor.id} variant={variant} p={16} hasHoverAnimation>
                <Flex flexDirection="column" gap={8}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontWeight="bold">{monitor.name}</Text>
                    <Label
                      text={monitor.type}
                      size="small"
                      variant={
                        monitor.type === "HTTP" || monitor.type === "HTTPS"
                          ? "info"
                          : monitor.type === "PING" || monitor.type === "TCP"
                            ? "success"
                            : monitor.type === "SSL_CERTIFICATE" ||
                                monitor.type === "DOMAIN_EXPIRY"
                              ? "warning"
                              : "default"
                      }
                      isUppercase
                    />
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text size="small">
                      Status: {latest?.status ?? "UNKNOWN"}
                    </Text>
                    <Text size="small">Interval: {monitor.interval}s</Text>
                  </Flex>

                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      size="small"
                      color={
                        latest?.responseTime != null
                          ? latest.responseTime > 400
                            ? "#e11d48"
                            : "#16a34a"
                          : undefined
                      }
                    >
                      {latest?.responseTime != null
                        ? `Latency: ${latest.responseTime}ms`
                        : "Latency: -"}
                    </Text>
                    <Text size="small">
                      {latest?.statusCode != null
                        ? `HTTP: ${latest.statusCode}`
                        : "HTTP: -"}
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text size="small">
                      {monitor.isEnabled ? "Enabled" : "Disabled"}
                    </Text>
                    <Text size="small">
                      {latest?.checkedAt
                        ? `Checked: ${new Date(latest.checkedAt).toLocaleString()}`
                        : "Checked: -"}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            );
          })}
      </MonitorsGrid>

      <div
        style={{ display: "flex", justifyContent: "center", paddingBottom: 16 }}
      >
        <Pagination
          onClick={fetchNextPage}
          currentPage={currentPage >= totalPages ? totalPages : currentPage}
          totalPages={totalPages}
          isLoading={false}
        />
      </div>
    </Flex>
  );
};

export default ProjectMonitorsPage;
