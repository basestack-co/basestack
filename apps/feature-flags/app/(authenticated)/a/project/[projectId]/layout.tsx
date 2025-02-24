"use client";

import React, { Fragment, useEffect } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const trpcUtils = api.useUtils();

  useEffect(() => {
    const data = trpcUtils.project.all.getData();

    const project = data?.projects?.find((project) => project.id === projectId);

    if (!project) {
      router.replace("/not-found");
    }
  }, [trpcUtils.project.all, projectId, router]);

  return <Fragment>{children}</Fragment>;
};

export default ProjectLayout;
