"use client";

import { Flex } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
// Components
import MonitorChecksGraph from "./__components/MonitorChecksGraph";
import MonitorChecksTable from "./__components/MonitorChecksTable";

const MonitorGeneralPage = () => {
  const { spacing } = useTheme();

  return (
    <Flex flexGrow={1} flexDirection="column" gap={spacing.s6}>
      <MonitorChecksGraph />
      <MonitorChecksTable />
    </Flex>
  );
};

export default MonitorGeneralPage;
