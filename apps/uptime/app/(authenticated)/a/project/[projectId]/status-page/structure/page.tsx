"use client";

// Navigation
import { useParams } from "next/navigation";

const StatusPageStructurePage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return <div>Status Page Structure Page - {projectId}</div>;
};

export default StatusPageStructurePage;
