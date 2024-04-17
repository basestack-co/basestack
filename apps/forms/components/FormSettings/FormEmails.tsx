import React, { useEffect, useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { Label, IconButton, InputGroup } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";
// Styles
import { TagsContainer } from "./styles";

export const FormSchema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  emails: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  emails?: string;
}

const FormEmailsCard = ({ emails = "" }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();
  const updateForm = trpc.form.update.useMutation();

  const { formId } = router.query as { formId: string };

  const {
    control,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    delayError: 250,
    defaultValues: {
      email: "",
      emails: [],
    },
  });

  const emailsValues = watch("emails");
  const emailValue = watch("email");

  useEffect(() => {
    if (emails) {
      setValue("emails", emails.split(","));
    }
  }, [emails, setValue]);

  const onSave = useCallback(async () => {
    updateForm.mutate(
      {
        formId,
        emails: emailsValues.join(","),
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                emails: result.form.emails,
              },
            );
          }

          toast.success(t("notifications.emails.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [emailsValues, updateForm, formId, trpcUtils, t]);

  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !errors.email && emailValue) {
        const ipExists = emailsValues?.find((item) => item === emailValue);

        if (ipExists) {
          setError("email", { message: "Email already exists" });
        } else {
          // Add the value to the list of emails
          setValue("emails", [...(emailsValues ?? []), emailValue]);
          // Clean up the input for the next value
          setValue("email", "");
        }
      }
    },
    [emailValue, setValue, emailsValues, errors, setError],
  );

  const onDeleteEmail = useCallback(
    (value: string) => {
      const emails = emailsValues?.filter((item) => item !== value);
      setValue("emails", emails);
    },
    [setValue, emailsValues],
  );

  return (
    <SettingCard
      title={t("notifications.emails.title")}
      description={t("notifications.emails.description")}
      button={t("notifications.emails.action")!}
      onClick={onSave}
      isDisabled={emails === emailsValues.join(",")}
      text={t("notifications.emails.text")}
      hasFooter
    >
      <>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              hint={t(errors.email?.message!)}
              inputProps={{
                type: "email",
                name: field.name,
                value: field.value as string,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: t("notifications.emails.inputs.name.placeholder"),
                hasError: !!errors.email,
                onKeyDown: onHandleKeyDown,
                maxWidth: 400,
              }}
            />
          )}
        />
        {!!emailsValues?.length && (
          <TagsContainer>
            {emailsValues.map((item, index) => (
              <Label key={index} text={item} size="normal" isTranslucent>
                <IconButton
                  icon="close"
                  size="small"
                  variant="secondaryDark"
                  onClick={() => onDeleteEmail(item)}
                />
              </Label>
            ))}
          </TagsContainer>
        )}
      </>
    </SettingCard>
  );
};

export default FormEmailsCard;
