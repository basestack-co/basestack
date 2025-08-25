"use client";

// Navigation
import { useParams } from "next/navigation";

const MonitorSettingsPage = () => {
  const { monitorId } = useParams<{ monitorId: string }>();

  return <div>Monitor Settings Page - {monitorId}</div>;
};

export default MonitorSettingsPage;
