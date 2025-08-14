"use client";

// Navigation
import { useParams } from "next/navigation";

const MonitorIncidentsPage = () => {
  const { monitorId } = useParams<{ monitorId: string }>();

  return <div>Monitor Incidents Page - {monitorId}</div>;
};

export default MonitorIncidentsPage;
