"use client";

// Navigation
import { useParams } from "next/navigation";
// React
import { Fragment, type ReactNode } from "react";

const IncidentLayout = ({ children }: { children: ReactNode }) => {
  const { incidentId } = useParams<{ incidentId: string }>();

  return (
    <Fragment>
      <div>Incident Layout - {incidentId}</div>
      <br />
      {children}
    </Fragment>
  );
};

export default IncidentLayout;
