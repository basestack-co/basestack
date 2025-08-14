"use client";

// Navigation
import { useParams } from "next/navigation";

const MonitorGeneralPage = () => {
  const { monitorId } = useParams<{ monitorId: string }>();

  return <div>Monitor General Page - {monitorId}</div>;
};

export default MonitorGeneralPage;
