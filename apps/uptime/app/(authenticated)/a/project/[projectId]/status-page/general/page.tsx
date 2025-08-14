"use client";

// Navigation
import { useParams } from "next/navigation";

const StatusPageGeneralPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return <div>Status Page General Page - {projectId}</div>;
};

export default StatusPageGeneralPage;
