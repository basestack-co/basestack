// Components
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
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

export const FormSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  websites: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  websites?: string;
}

const FormWebsitesCard = ({ websites = "" }: Props) => {
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
      website: "",
      websites: [],
    },
  });

  const websitesValues = watch("websites");
  const websiteValue = watch("website");

  useEffect(() => {
    if (websites) {
      setValue("websites", websites.split(","));
    }
  }, [websites, setValue]);

  const onSave = useCallback(async () => {
    updateForm.mutate(
      {
        formId,
        websites: websitesValues.join(","),
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
                websites: result.form.websites,
              },
            );
          }

          toast.success(t("setting.security.websites.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [websitesValues, updateForm, formId, trpcUtils, t]);

  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !errors.website && websiteValue) {
        const ipExists = websitesValues?.find((item) => item === websiteValue);

        if (ipExists) {
          setError("website", { message: "Website already exists" });
        } else {
          // Add the value to the list of websites
          setValue("websites", [...(websitesValues ?? []), websiteValue]);
          // Clean up the input for the next value
          setValue("website", "");
        }
      }
    },
    [websiteValue, setValue, websitesValues, errors, setError],
  );

  const onDeleteWebsite = useCallback(
    (value: string) => {
      const ips = websitesValues?.filter((item) => item !== value);
      setValue("websites", ips);
    },
    [setValue, websitesValues],
  );

  return (
    <SettingCard
      title={t("setting.security.websites.title")}
      description={t("setting.security.websites.description")}
      button={t("setting.security.websites.action")}
      text={t("setting.security.websites.text")}
      onClick={onSave}
      isLoading={isSubmitting}
      isDisabled={websites === websitesValues.join(",")}
    >
      <Controller
        name="website"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={errors.website?.message}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t(
                "setting.security.websites.inputs.name.placeholder",
              ),
              hasError: !!errors.website,
              onKeyDown: onHandleKeyDown,
              maxWidth: 400,
            }}
          />
        )}
      />
      {!!websitesValues?.length && (
        <TagsContainer>
          {websitesValues.map((item, index) => (
            <Label key={index} text={item} size="normal" isTranslucent>
              <IconButton
                icon="close"
                size="small"
                variant="secondaryDark"
                onClick={() => onDeleteWebsite(item)}
              />
            </Label>
          ))}
        </TagsContainer>
      )}
    </SettingCard>
  );
};

export default FormWebsitesCard;
