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
// Toast
import { toast } from "sonner";

export interface Props {
  name?: string;
}

const DeleteProjectCard = ({ name }: Props) => {
  const t = useTranslations("setting");
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const deleteProject = api.project.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);
  const { projectId } = useParams<{ projectId: string }>();

  const onDeleteProject = () => {
    deleteProject.mutate(
      {
        projectId,
      },
      {
        onSuccess: async (result) => {
          // Get all the projects on the cache
          const prev = trpcUtils.project.all.getData();

          if (prev && prev.projects) {
            // Find the project and remove from the list
            const projects = prev.projects.filter(
              (project) => project.id !== result.project.id,
            );

            // Update the cache with the new data
            trpcUtils.project.all.setData(undefined, { projects });

            // Reset the recent projects cache
            await trpcUtils.project.recent.invalidate();
            // Reset the usage cache
            await trpcUtils.subscription.usage.invalidate();
          }

          router.replace("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  };

  const onClickDeleteProject = () => {
    setConfirmModalOpen({
      isOpen: true,
      data: {
        title: t("general.delete.project.modal.title"),
        description: t("general.delete.project.modal.description", {
          name: `<b>${name}</b>`,
        }),
        type: "delete",
        buttonText: t("general.delete.project.modal.action"),
        onClick: () => {
          onDeleteProject();
          setConfirmModalOpen({
            isOpen: false,
          });
        },
      },
    });
  };

  return (
    <SettingCard
      title={t("general.delete.project.title")}
      description={t("general.delete.project.description")}
      button={t("general.delete.project.action")}
      onClick={onClickDeleteProject}
      text={t("general.delete.project.placeholder")}
      isDisabled={deleteProject.isPending}
      variant={CardVariant.DANGER}
      isLoading={deleteProject.isPending}
    />
  );
};

export default DeleteProjectCard;
