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
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanCardProps } from "../../utils";
// Styles
import { TagsContainer } from "../../styles";

export const FormSchema = z.object({
  website: z.string().url().optional().or(z.literal("")),
  websites: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  websites?: string;
  planId: PlanTypeId;
}

const FlagsWebsitesCard = ({ websites = "", planId }: Props) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateProject = api.project.update.useMutation();

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
    updateProject.mutate(
      {
        projectId,
        websites: websitesValues.join(","),
        feature: "hasWebsites",
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.project.byId.getData({
            projectId: result.project.id,
          });

          if (cache) {
            trpcUtils.project.byId.setData(
              { projectId: result.project.id },
              {
                ...cache,
                websites: result.project.websites,
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
  }, [websitesValues, updateProject, projectId, trpcUtils, t]);

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
      {...getWithPlanCardProps({
        t,
        router,
        planId,
        feature: "hasWebsites",
        i18nKey: "setting.security.websites.action",
        i18nHintKey: "setting.security.websites.text",
        onClick: onSave,
        isLoading: isSubmitting,
        isDisabled: websites === websitesValues.join(","),
      })}
    >
      <>
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
      </>
    </SettingCard>
  );
};

export default FlagsWebsitesCard;
