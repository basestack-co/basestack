"use client";

// Navigation
import { useParams } from "next/navigation";
// React
import { Fragment, type ReactNode } from "react";

const ProjectStatusPageLayout = ({ children }: { children: ReactNode }) => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <Fragment>
      <div>Project Status Page Layout - {projectId}</div>
      <div>show the domain here</div>
      <br />
      {children}
    </Fragment>
  );
};

export default ProjectStatusPageLayout;
