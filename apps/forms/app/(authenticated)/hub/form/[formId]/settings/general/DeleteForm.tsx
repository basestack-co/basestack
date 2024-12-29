import React from "react";
// Store
import { useStore } from "store";
// UI
import { SettingCard } from "@basestack/ui";
import { CardVariant } from "@basestack/design-system";
// Server
import { api } from "utils/trpc/react";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";

export interface Props {
  name?: string;
}

const DeleteFormCard = ({ name }: Props) => {
  const t = useTranslations("setting");
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const trpcUtils = api.useUtils();
  const deleteProject = api.form.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const onDeleteForm = () => {
    deleteProject.mutate(
      {
        formId,
      },
      {
        onSuccess: async (result) => {
          // Get all the projects on the cache
          const prev = trpcUtils.form.all.getData();

          if (prev && prev.forms) {
            // Find the form and remove from the list
            const forms = prev.forms.filter(
              (form) => form.id !== result.form.id,
            );

            // Update the cache with the new data
            trpcUtils.form.all.setData(undefined, { forms });
          }

          await router.replace("/");
        },
      },
    );
  };

  const onClickDeleteProject = () => {
    setConfirmModalOpen({
      isOpen: true,
      data: {
        title: t("general.delete.form.modal.title"),
        description: t("general.delete.form.modal.description", {
          name: `<b>${name}</b>`,
        }),
        type: "delete",
        buttonText: t("general.delete.form.modal.action"),
        onClick: () => {
          onDeleteForm();
          setConfirmModalOpen({
            isOpen: false,
          });
        },
      },
    });
  };

  return (
    <SettingCard
      title={t("general.delete.form.title")}
      description={t("general.delete.form.description")}
      button={t("general.delete.form.action")}
      onClick={onClickDeleteProject}
      text={t("general.delete.form.placeholder")}
      isDisabled={deleteProject.isPending}
      variant={CardVariant.DANGER}
      isLoading={deleteProject.isPending}
    />
  );
};

export default DeleteFormCard;
