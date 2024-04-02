import React, { useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { Input } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  ips: z.string(),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  blockIpAddresses?: string;
}

const FormIpRulesCard = ({ blockIpAddresses = "" }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();
  const updateForm = trpc.form.update.useMutation();

  const { formId } = router.query as { formId: string };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const watchIps = watch("ips");

  useEffect(() => {
    if (blockIpAddresses) {
      setValue("ips", blockIpAddresses);
    }
  }, [blockIpAddresses, setValue]);

  const onSave: SubmitHandler<FormInputs> = async (input) => {
    updateForm.mutate(
      {
        formId,
        blockIpAddresses: input.ips,
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
                blockIpAddresses: result.form.blockIpAddresses,
              },
            );
          }

          toast.success(t("security.ip-block-rules.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <SettingCard
      title={t("security.ip-block-rules.title")}
      description={t("security.ip-block-rules.description")}
      button={t("security.ip-block-rules.action")!}
      onClick={handleSubmit(onSave)}
      isDisabled={isSubmitting || watchIps === blockIpAddresses}
      isLoading={isSubmitting}
      text={t("security.ip-block-rules.text")}
      hasFooter
    >
      <Controller
        name="ips"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={400}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("security.ip-block-rules.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.ips}
            isDisabled={isSubmitting}
          />
        )}
      />
    </SettingCard>
  );
};

export default FormIpRulesCard;
