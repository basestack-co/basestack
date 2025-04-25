"use client";

import React, { Fragment, useEffect, useMemo } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const trpcUtils = api.useUtils();

  const project = useMemo(() => {
    const data = trpcUtils.project.all.getData();

    return data?.projects?.find((project) => project.id === projectId);
  }, [projectId, trpcUtils.project.all]);

  useEffect(() => {
    if (!project) {
      router.replace("/not-found");
    }
  }, [router, project]);

  if (!project) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProjectLayout;
