"use client";

import {
  Box,
  Card,
  Text,
  HorizontalRule,
  Segment,
} from "@basestack/design-system";
import { rem } from "polished";
import { useTheme } from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// Navigation
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// React
import { useMemo, useState } from "react";

const MonitorChecksGraph = () => {
  const { spacing, typography, colors, rechart, isDarkMode } = useTheme();
  const { monitorId, projectId } = useParams<{
    monitorId: string;
    projectId: string;
  }>();

  const [range, setRange] = useState<"day" | "week" | "month">("month");

  const { data, isLoading } = api.projectMonitorChecks.graph.useQuery(
    {
      projectId,
      monitorId,
      range,
    },
    {
      enabled: !!monitorId && !!projectId,
    }
  );

  const formatTick = useMemo(() => {
    if (!data?.unit) return (iso: string) => iso;
    return (iso: string) => {
      const d = new Date(iso);
      if (data.unit === "minute")
        return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      if (data.unit === "hour")
        return d.toLocaleString([], {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
        });
      return d.toLocaleDateString([], { month: "short", day: "2-digit" });
    };
  }, [data?.unit]);

  return (
    <Card width="100%">
      <Box px={spacing.s5} py={spacing.s3}>
        <Text muted>Response times</Text>
      </Box>
      <HorizontalRule mb={spacing.s5} isDarker />

      <Box display="flex" justifyContent="flex-end" px={spacing.s5}>
        <Segment
          {...(isDarkMode ? { backgroundColor: colors.gray700 } : {})}
          selectedIndex={range === "day" ? 0 : range === "week" ? 1 : 2}
          onSelect={(id) => setRange(id as "day" | "week" | "month")}
          items={[
            { id: "day", text: "Day" },
            { id: "week", text: "Week" },
            { id: "month", text: "Month" },
          ]}
        />
      </Box>

      <Box p={spacing.s5} minHeight={rem("400px")}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data?.data ?? []}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              tick={{
                fill: rechart.text.normal,
                fontSize: 14,
                fontFamily: typography.roboto,
              }}
              tickFormatter={formatTick}
            />
            <YAxis
              tick={{
                fill: rechart.text.normal,
                fontSize: 14,
                fontFamily: typography.roboto,
              }}
            />
            <Tooltip labelFormatter={(iso) => formatTick(String(iso))} />
            <Legend />
            <Line
              type="monotone"
              dataKey="responseTime"
              name="Response Time (ms)"
              stroke={rechart.line.stroke.primary}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="responseSize"
              name="Response Size (bytes)"
              stroke={rechart.line.stroke.positive}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="statusCode"
              name="Status Code"
              stroke={rechart.line.stroke.positive}
              dot={false}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default MonitorChecksGraph;
