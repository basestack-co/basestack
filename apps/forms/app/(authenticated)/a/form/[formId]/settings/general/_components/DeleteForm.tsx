import { CardVariant } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";

export interface Props {
  name?: string;
}

const DeleteFormCard = ({ name }: Props) => {
  const t = useTranslations("setting");
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const trpcUtils = api.useUtils();
  const deleteProject = api.forms.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const onDeleteForm = () => {
    deleteProject.mutate(
      {
        formId,
      },
      {
        onSuccess: async (result) => {
          // Get all the forms on the cache
          const prevAllForms = trpcUtils.forms.list.getData();

          if (prevAllForms?.forms) {
            // Find the form and remove from the list
            const forms = prevAllForms.forms.filter(
              (form) => form.id !== result.form.id,
            );

            // Update the cache with the new data
            trpcUtils.forms.list.setData(undefined, { forms });
          }

          // Get all the recent forms on the cache
          const prevRecentForms = trpcUtils.forms.recent.getData();

          if (prevRecentForms) {
            // Find the form and remove from the list
            const forms = prevRecentForms.filter(
              (form) => form.id !== result.form.id,
            );

            // Update the cache with the new data
            trpcUtils.forms.recent.setData(undefined, forms);
            // Reset the usage cache
            await trpcUtils.subscription.usage.invalidate();
          }

          router.replace("/");
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
