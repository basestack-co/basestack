"use client";

// Router
import { useParams, useRouter } from "next/navigation";
import type React from "react";
import { Fragment, useEffect } from "react";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();

  const { data, isLoading, isError, error } = api.forms.byId.useQuery(
    { formId },
    {
      enabled: !!formId,
    },
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

export default FormLayout;
