"use client";

import React, { Fragment, useEffect } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Server
import { api } from "utils/trpc/react";

const FormLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const trpcUtils = api.useUtils();

  useEffect(() => {
    const data = trpcUtils.form.all.getData();

    const form = data?.forms?.find((project) => project.id === formId);

    if (!form) {
      router.replace("/not-found");
    }
  }, [formId, router, trpcUtils.form.all]);

  return <Fragment>{children}</Fragment>;
};

export default FormLayout;
