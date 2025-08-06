// UI
import { SwitchSettingCard } from "@basestack/ui";
// Utils
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback } from "react";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";

export interface Props {
  hasDataQueryString?: boolean;
}

const FormSendQueryStringCard = ({ hasDataQueryString = false }: Props) => {
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateForm = api.forms.update.useMutation();

  const onChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      updateForm.mutate(
        {
          formId,
          hasDataQueryString: event.target.checked,
          feature: "hasDataQueryString",
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
                  hasDataQueryString: result.form.hasDataQueryString,
                }
              );
            }

            toast.success(
              t("setting.customization.data-query-string.toast.success")
            );
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    },
    [trpcUtils, formId, updateForm, t]
  );

  return (
    <SwitchSettingCard
      title={t("setting.customization.data-query-string.title")}
      description={t("setting.customization.data-query-string.description")}
      onChange={onChange}
      checked={hasDataQueryString}
    />
  );
};

export default FormSendQueryStringCard;
