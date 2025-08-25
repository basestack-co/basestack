"use client";

import { Card, Table } from "@basestack/design-system";
// Navigation
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// React
import { useMemo } from "react";
// Utils
import dayjs from "dayjs";

const MonitorChecksTable = () => {
  const { monitorId, projectId } = useParams<{
    monitorId: string;
    projectId: string;
  }>();

  const { data, isLoading } = api.projectMonitorChecks.list.useQuery(
    {
      projectId,
      monitorId,
      limit: 10,
    },
    {
      enabled: !!monitorId && !!projectId,
    }
  );

  const tableData = useMemo(() => {
    const checks = data?.checks ?? [];
    return {
      headers: ["Time", "Status", "Status Code", "Response Time (ms)"],
      rows: checks.map((c) => ({
        cols: [
          { title: dayjs(c.checkedAt).format("DD/MM/YYYY HH:mm") },
          { title: c.status },
          { title: c.statusCode != null ? String(c.statusCode) : "-" },
          { title: c.responseTime != null ? String(c.responseTime) : "-" },
        ],
      })),
    };
  }, [data?.checks]);

  return (
    <Card>
      <Table backgroundColor="transparent" data={tableData} />
    </Card>
  );
};

export default MonitorChecksTable;
