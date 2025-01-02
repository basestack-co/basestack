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
  hasSpamProtection?: boolean;
  isDisabled?: boolean;
  planId: PlanTypeId;
}

const FormSpamProtectionCard = ({
  hasSpamProtection = false,
  isDisabled = false,
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
          hasSpamProtection: event.target.checked,
          feature: "hasSpamProtection",
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
                  hasSpamProtection: result.form.hasSpamProtection,
                },
              );
            }

            toast.success(t("setting.security.spam-protection.toast.success"));
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
      title={t("setting.security.spam-protection.title")}
      description={t("setting.security.spam-protection.description")}
      {...getWithPlanSwitchProps({
        t,
        planId,
        feature: "hasSpamProtection",
        isDisabled,
        onChange,
        checked: hasSpamProtection,
        partial: false,
      })}
    />
  );
};

export default FormSpamProtectionCard;
