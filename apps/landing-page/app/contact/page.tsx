"use client";

import React, { Fragment } from "react";
// Components
import Form, { FormInputs } from "components/Form";
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Form
import { UseFormReset } from "react-hook-form";

const RequestDemoPage = () => {
  const t = useTranslations();

  const onSubmit = async (
    inputs: FormInputs,
    reset: UseFormReset<FormInputs>,
  ) => {
    if (!process.env.NEXT_PUBLIC_FORM_REQUEST_DEMO_ENDPOINT) return;

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_FORM_REQUEST_DEMO_ENDPOINT,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        },
      );

      await res.json();

      toast.success(t("common.toast.sales.success"));

      reset();
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    }
  };

  return (
    <Fragment>
      <Form
        header={{
          caption: t("page.contact.caption"),
          title: t("page.contact.title"),
          text: t("page.contact.description"),
          titleTag: "h1",
        }}
        onSave={onSubmit}
      />
    </Fragment>
  );
};

export default RequestDemoPage;
