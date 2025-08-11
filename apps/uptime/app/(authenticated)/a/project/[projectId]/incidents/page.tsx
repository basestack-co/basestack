"use client";

import {
  Empty,
  Label,
  Pagination,
  Search,
  Table,
  Text,
} from "@basestack/design-system";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { api } from "utils/trpc/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s5};
  padding: ${({ theme }) => theme.spacing.s6} ${({ theme }) => theme.spacing.s5};
`;

const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.s3};
  align-items: center;
  justify-content: space-between;
`;

const ProjectIncidentsPage = () => {
  // const theme = useTheme();
  const { projectId } = useParams<{ projectId: string }>();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, fetchNextPage } =
    api.projectIncidents.list.useInfiniteQuery(
      { projectId, limit: 20, search: debouncedSearch },
      {
        enabled: !!projectId,
        getNextPageParam: (last) => last.nextCursor,
        refetchOnWindowFocus: false,
        staleTime: 30_000,
      },
    );

  const [currentPage, totalPages] = useMemo(() => {
    return [(data?.pages.length ?? 0) * 20, data?.pages?.[0]?.total ?? 0];
  }, [data]);

  const rows = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((page) =>
      page.incidents.map((i) => {
        const statusVariant =
          i.status === "RESOLVED"
            ? "success"
            : i.status === "IDENTIFIED"
              ? "warning"
              : i.status === "MONITORING"
                ? "info"
                : "danger"; // INVESTIGATING default red
        const severityVariant =
          i.severity === "CRITICAL"
            ? "danger"
            : i.severity === "MAJOR"
              ? "warning"
              : "default";

        const time = i.resolvedAt
          ? new Date(i.resolvedAt).toLocaleString()
          : new Date(i.createdAt).toLocaleString();

        return {
          cols: [
            { title: i.title },
            {
              children: (
                <Label
                  text={i.status}
                  size="small"
                  variant={statusVariant}
                  isUppercase
                />
              ),
              title: i.status,
            },
            {
              children: (
                <Label
                  text={i.severity}
                  size="small"
                  variant={severityVariant}
                  isUppercase
                />
              ),
              title: i.severity,
            },
            { title: i.isScheduled ? "Scheduled" : "Unplanned" },
            { title: time },
            {
              children: (
                <Text size="small" muted>
                  {(i.monitors || []).map((m) => m.name).join(", ") || "-"}
                </Text>
              ),
              title: String(i._count.monitors ?? 0),
            },
            {
              title: i.latestUpdate?.message
                ? `${i.latestUpdate.message}`
                : "—",
            },
          ],
          more: [],
        };
      }),
    );
  }, [data]);

  if (!isLoading && (totalPages ?? 0) <= 0) {
    return (
      <Empty
        iconName="warning"
        title="No incidents yet"
        description="When incidents are created, they'll appear here."
      />
    );
  }

  return (
    <Container>
      <Toolbar>
        <Text as="h1" size="large" fontWeight={600}>
          Incidents
        </Text>
        <Search
          placeholder="Search incidents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          isDisabled={false}
          width="360px"
        />
      </Toolbar>

      <Table
        data={{
          headers: [
            "Title",
            "Status",
            "Severity",
            "Type",
            "Time",
            "Monitors",
            "Latest update",
          ],
          rows,
        }}
        isResponsive
        breakpoint="md"
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          onClick={fetchNextPage}
          currentPage={currentPage >= totalPages ? totalPages : currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
        />
      </div>
    </Container>
  );
};

export default ProjectIncidentsPage;
