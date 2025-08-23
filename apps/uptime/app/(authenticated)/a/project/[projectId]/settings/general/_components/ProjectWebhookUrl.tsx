// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useEffect } from "react";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";

export const FormSchema = z.object({
  url: z.string().url().optional().or(z.literal("")),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  webhookUrl?: string;
  isDisabled?: boolean;
}

const ProjectWebhookUrl = ({ webhookUrl = "", isDisabled = false }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateProject = api.projects.update.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      url: "",
    },
  });

  const watchUrl = watch("url");

  useEffect(() => {
    setValue("url", webhookUrl);
  }, [webhookUrl, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateProject.mutate(
      {
        projectId,
        webhookUrl: input.url,
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.projects.byId.getData({
            projectId: result.project.id,
          });

          if (cache) {
            trpcUtils.projects.byId.setData(
              { projectId: result.project.id },
              {
                ...cache,
                webhookUrl: result.project.webhookUrl,
              }
            );
          }

          toast.success(t("setting.general.webhook-url.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <SettingCard
      title={t("setting.general.webhook-url.title")}
      description={t("setting.general.webhook-url.description")}
      hasOverlay={isDisabled}
      text={""}
      button={t("setting.general.webhook-url.action")}
      onClick={handleSubmit(onSave)}
      isLoading={isSubmitting}
      isDisabled={isSubmitting || watchUrl === webhookUrl || !!errors.url}
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={errors.url?.message}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t(
                "setting.general.webhook-url.inputs.name.placeholder"
              ),
              hasError: !!errors.url,
              maxWidth: 560,
              isDisabled: isSubmitting,
            }}
          />
        )}
      />
    </SettingCard>
  );
};

export default ProjectWebhookUrl;
