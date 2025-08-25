"use client";

import {
  Box,
  Card,
  Text,
  HorizontalRule,
  Segment,
  Table,
  Flex,
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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const MonitorGeneralPage = () => {
  const { spacing, typography, colors, rechart, isDarkMode } = useTheme();
  const { monitorId } = useParams<{ monitorId: string }>();

  return (
    <Flex flexGrow={1} flexDirection="column" gap={spacing.s6}>
      <Card width="100%">
        <Box px={spacing.s5} py={spacing.s3}>
          <Text muted>Response times</Text>
        </Box>
        <HorizontalRule mb={spacing.s5} isDarker />

        <Box display="flex" justifyContent="flex-end" px={spacing.s5}>
          <Segment
            {...(isDarkMode ? { backgroundColor: colors.gray700 } : {})}
            onSelect={() => ""}
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
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{
                  fill: rechart.text.normal,
                  fontSize: 14,
                  fontFamily: typography.roboto,
                }}
              />
              <YAxis
                tick={{
                  fill: rechart.text.normal,
                  fontSize: 14,
                  fontFamily: typography.roboto,
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke={rechart.line.stroke.primary}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke={rechart.line.stroke.positive}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      <Card>
        <Table
          backgroundColor="transparent"
          data={{
            headers: ["Name", "Status", "Uptime", "Response Time"],
            rows: [
              {
                cols: [
                  { title: "Lorem" },
                  { title: "Ipsum" },
                  { title: "Dolor" },
                  { title: "Sit amet" },
                ],
              },
              {
                cols: [
                  { title: "Lorem" },
                  { title: "Ipsum" },
                  { title: "Dolor" },
                  { title: "Sit amet" },
                ],
              },
              {
                cols: [
                  { title: "Lorem" },
                  { title: "Ipsum" },
                  { title: "Dolor" },
                  { title: "Sit amet" },
                ],
              },
            ],
          }}
        />
      </Card>
    </Flex>
  );
};

export default MonitorGeneralPage;
