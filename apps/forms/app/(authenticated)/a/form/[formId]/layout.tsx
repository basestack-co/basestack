"use client";

import React, { Fragment, useEffect, useMemo } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const trpcUtils = api.useUtils();

  const form = useMemo(() => {
    const data = trpcUtils.form.all.getData();

    return data?.forms?.find((project) => project.id === formId);
  }, [formId, trpcUtils.form.all]);

  useEffect(() => {
    if (!form) {
      router.replace("/not-found");
    }
  }, [form, router]);

  if (!form) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};

export default FormLayout;
