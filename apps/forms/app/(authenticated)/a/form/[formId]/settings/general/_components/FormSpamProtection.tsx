// UI
import { SwitchSettingCard } from "@basestack/ui";
// Utils
import type { PlanTypeId } from "@basestack/utils";
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
import { getWithPlanSwitchProps } from "../../utils";

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
  const updateForm = api.forms.update.useMutation();

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
            const cache = trpcUtils.forms.byId.getData({
              formId: result.form.id,
            });

            if (cache) {
              trpcUtils.forms.byId.setData(
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
        planId,
        feature: "hasSpamProtection",
        isDisabled,
        onChange,
        checked: hasSpamProtection,
        label: t(`common.plan.forms.upgrade.all`),
      })}
    />
  );
};

export default FormSpamProtectionCard;
