"use client";

import { Box } from "@basestack/design-system";
// Navigation
import { useParams } from "next/navigation";

const MonitorGeneralPage = () => {
  const { monitorId } = useParams<{ monitorId: string }>();

  return <Box>Monitor General Page - {monitorId}</Box>;
};

export default MonitorGeneralPage;
