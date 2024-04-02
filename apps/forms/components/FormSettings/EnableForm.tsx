import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface Props {
  isEnabled?: boolean;
}

const EnableFormCard = ({ isEnabled = false }: Props) => {
  const router = useRouter();
  const { t } = useTranslation("settings");
  const trpcUtils = trpc.useUtils();
  const updateForm = trpc.form.update.useMutation();

  const { formId } = router.query as { formId: string };

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      updateForm.mutate(
        {
          formId,
          isEnabled: event.target.checked,
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
