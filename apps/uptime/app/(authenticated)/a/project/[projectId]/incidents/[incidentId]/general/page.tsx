"use client";

// Navigation
import { useParams } from "next/navigation";

const IncidentGeneralPage = () => {
  const { incidentId } = useParams<{ incidentId: string }>();

  return <div>Incident General Page - {incidentId}</div>;
};

export default IncidentGeneralPage;
