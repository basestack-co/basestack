import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface Props {
  hasDataQueryString?: boolean;
}

const FormSendQueryStringCard = ({ hasDataQueryString = false }: Props) => {
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
          hasDataQueryString: event.target.checked,
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
                  hasDataQueryString: result.form.hasDataQueryString,
                },
              );
            }
          },
        },
      );
    },
    [trpcUtils, formId, updateForm],
  );

  return (
    <SwitchSettingCard
      title={t("customization.data-query-string.title")}
      description={t("customization.data-query-string.description")}
      checked={hasDataQueryString}
      onChange={onChange}
    />
  );
};

export default FormSendQueryStringCard;
