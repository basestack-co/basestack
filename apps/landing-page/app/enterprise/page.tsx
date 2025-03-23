"use client";

import React, { Fragment } from "react";
// Components
import Form, { FormInputs } from "components/Form";
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Form
import { UseFormReset } from "react-hook-form";

const ContactEnterprisePage = () => {
  const t = useTranslations();

  const onSubmit = async (
    inputs: FormInputs,
    reset: UseFormReset<FormInputs>,
  ) => {
    if (!process.env.NEXT_PUBLIC_FORM_QUOTES_ENDPOINT) return;

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORM_QUOTES_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      await res.json();

      toast.success(t("common.toast.enterprise.success"));

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
          caption: t("page.enterprise.caption"),
          title: t("page.enterprise.title"),
          text: t("page.enterprise.description"),
        }}
        onSave={onSubmit}
      />
    </Fragment>
  );
};

export default ContactEnterprisePage;
