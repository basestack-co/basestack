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
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";
// Styles
import { TagsContainer } from "./styles";

export const FormSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  websites: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  websites?: string;
}

const FormWebsitesCard = ({ websites = "" }: Props) => {
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
          const cache = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                websites: result.form.websites,
              },
            );
          }

          toast.success(t("security.websites.toast.success"));
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
      title={t("security.websites.title")}
      description={t("security.websites.description")}
      button={t("security.websites.action")!}
      onClick={onSave}
      isDisabled={websites === websitesValues.join(",")}
      text={t("security.websites.text")}
      hasFooter
    >
      <>
        <Controller
          name="website"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              hint={t(errors.website?.message!)}
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value as string,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: t("security.websites.inputs.name.placeholder"),
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
      </>
    </SettingCard>
  );
};

export default FormWebsitesCard;
