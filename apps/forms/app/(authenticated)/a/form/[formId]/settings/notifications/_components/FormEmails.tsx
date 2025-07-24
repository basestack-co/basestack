// Components
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import type { PlanTypeId } from "@basestack/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback, useEffect } from "react";
// Form
import { Controller, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";
// Styles
import { TagsContainer } from "../../styles";
import { getWithPlanCardProps } from "../../utils";

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
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();

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
          const cache = trpcUtils.forms.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.forms.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                emails: result.form.emails,
              },
            );
          }

          toast.success(t("setting.notifications.emails.toast.success"));
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
      title={t("setting.notifications.emails.title")}
      description={t("setting.notifications.emails.description")}
      {...getWithPlanCardProps({
        router,
        planId,
        feature: "hasEmailNotifications",
        onClick: onSave,
        isLoading: isSubmitting,
        isDisabled: emails === emailsValues.join(","),
        labels: {
          partial: t("common.plan.forms.upgrade.partial"),
          all: t("common.plan.forms.upgrade.all"),
          upgrade: t("common.plan.forms.upgrade.action"),
          save: t("setting.notifications.emails.action"),
          text: t("setting.notifications.emails.text"),
        },
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
                placeholder: t(
                  "setting.notifications.emails.inputs.name.placeholder",
                ),
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
