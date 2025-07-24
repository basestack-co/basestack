// UI
import { SwitchSettingCard } from "@basestack/ui";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";

export interface Props {
  hasRetention?: boolean;
}

const FormDataRetentionCard = ({ hasRetention = false }: Props) => {
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      updateForm.mutate(
        {
          formId,
          hasRetention: event.target.checked,
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
                  hasRetention: result.form.hasRetention,
                },
              );
            }

            toast.success(t("general.data-retention.toast.success"));
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
    [trpcUtils, formId, updateForm, t],
  );

  return (
    <SwitchSettingCard
      title={t("general.data-retention.title")}
      description={t("general.data-retention.description")}
      checked={hasRetention}
      onChange={onChange}
    />
  );
};

export default FormDataRetentionCard;
