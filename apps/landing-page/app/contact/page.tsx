"use client";

// Components
import Form, { type FormInputs } from "components/Form";
// Locales
import { useTranslations } from "next-intl";
// Form
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

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

      const data = await res.json();

      if (data.error) {
        toast.error(data.message);
      }

      if (data.code === 200) {
        toast.success(t("common.toast.sales.success"));
        reset();
      }
    } catch (error) {
      const { message } = error as Error;
      toast.error(message);
    }
  };

  return (
    <Form
      header={{
        caption: t("page.contact.caption"),
        title: t("page.contact.title"),
        text: t("page.contact.description"),
        titleTag: "h1",
      }}
      onSave={onSubmit}
    />
  );
};

export default RequestDemoPage;
