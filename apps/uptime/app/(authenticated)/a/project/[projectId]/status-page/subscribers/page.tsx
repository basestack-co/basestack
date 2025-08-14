"use client";

// Navigation
import { useParams } from "next/navigation";

const StatusPageSubscribersPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return <div>Status Page Subscribers Page - {projectId}</div>;
};

export default StatusPageSubscribersPage;
