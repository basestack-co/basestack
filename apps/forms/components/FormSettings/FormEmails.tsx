import React, { useEffect, useCallback } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { api } from "utils/trpc/react";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import {
  Label,
  IconButton,
  InputGroup,
  CardVariant,
} from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanCardProps } from "./utils";
// Styles
import { TagsContainer } from "./styles";

export const FormSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  emails: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  emails?: string;
  planId: PlanTypeId;
}

const FormEmailsCard = ({ emails = "", planId }: Props) => {
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateForm = api.form.update.useMutation();

  const {
    control,
    formState: { errors, isSubmitting },
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
        feature: "hasEmailNotifications",
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
      {...getWithPlanCardProps({
        t,
        router,
        planId,
        feature: "hasEmailNotifications",
        i18nKey: "notifications.emails.action",
        i18nHintKey: "notifications.emails.text",
        onClick: onSave,
        isLoading: isSubmitting,
        isDisabled: emails === emailsValues.join(","),
      })}
    >
      <>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              hint={errors.email?.message}
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
