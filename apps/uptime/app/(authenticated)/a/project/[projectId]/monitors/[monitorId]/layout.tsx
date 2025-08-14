"use client";

// Navigation
import { useParams } from "next/navigation";
// React
import { Fragment, type ReactNode } from "react";

const MonitorLayout = ({ children }: { children: ReactNode }) => {
  const { monitorId } = useParams<{ monitorId: string }>();

  return (
    <Fragment>
      <div>Monitor Layout - {monitorId}</div>
      <br />
      {children}
    </Fragment>
  );
};

export default MonitorLayout;
