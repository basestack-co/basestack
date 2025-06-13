import React, { useCallback } from "react";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";

export interface Props {
  isEnabled?: boolean;
}

const EnableFormCard = ({ isEnabled = false }: Props) => {
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      updateForm.mutate(
        {
          formId,
          isEnabled: event.target.checked,
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
                  isEnabled: result.form.isEnabled,
                },
              );
            }

            toast.success(t("general.enable-form.toast.success"));
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
      title={t("general.enable-form.title")}
      description={t("general.enable-form.description")}
      checked={isEnabled}
      onChange={onChange}
    />
  );
};

export default EnableFormCard;
