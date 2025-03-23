import React, { useCallback } from "react";
// Router
import { useParams } from "next/navigation";
// Server
import { api } from "utils/trpc/react";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanSwitchProps } from "../../utils";
// Locales
import { useTranslations } from "next-intl";

export interface Props {
  hasDataQueryString?: boolean;
  planId: PlanTypeId;
}

const FormSendQueryStringCard = ({
  hasDataQueryString = false,
  planId,
}: Props) => {
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateForm = api.form.update.useMutation();

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

            toast.success(
              t("setting.customization.data-query-string.toast.success"),
            );
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
      title={t("setting.customization.data-query-string.title")}
      description={t("setting.customization.data-query-string.description")}
      {...getWithPlanSwitchProps({
        planId,
        feature: "hasDataQueryString",
        isDisabled: false,
        onChange,
        checked: hasDataQueryString,
        label: t(`common.plan.forms.upgrade.partial`),
      })}
    />
  );
};

export default FormSendQueryStringCard;
