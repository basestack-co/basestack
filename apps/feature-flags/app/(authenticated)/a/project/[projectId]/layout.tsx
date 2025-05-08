"use client";

import React, { Fragment, useEffect, useMemo } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();

  const { data, isLoading, isError, error } = api.project.byId.useQuery(
    { projectId },
    {
      enabled: !!projectId,
      retry: 1,
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.message);

      setTimeout(() => {
        router.replace("/a");
      }, 0);
    }
  }, [router, isError, error?.message]);

  if (!data || isLoading || isError) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProjectLayout;
