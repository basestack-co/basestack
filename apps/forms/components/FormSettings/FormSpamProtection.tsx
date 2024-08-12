import React, { useCallback } from "react";
// Router
import { useRouter } from "next/router";
// Server
import { trpc } from "libs/trpc";
// UI
import { SwitchSettingCard } from "@basestack/ui";
// Toast
import { toast } from "sonner";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanSwitchProps } from "./utils";
// Locales
import useTranslation from "next-translate/useTranslation";

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

            toast.success(t("security.spam-protection.toast.success"));
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
      title={t("security.spam-protection.title")}
      description={t("security.spam-protection.description")}
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
