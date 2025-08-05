"use client";

// Router
import { useParams, useRouter } from "next/navigation";
import type React from "react";
import { Fragment, useEffect } from "react";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";

const ServiceLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { serviceId } = useParams<{ serviceId: string }>();

  const { data, isLoading, isError, error } = api.services.byId.useQuery(
    { serviceId },
    {
      enabled: !!serviceId,
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

export default ServiceLayout;
