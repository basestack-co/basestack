import React from "react";
// Store
import { useStore } from "store";
// UI
import { SettingCard } from "@basestack/ui";
import { CardVariant } from "@basestack/design-system";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Types
import { ProjectSettings } from "types";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface Props {
  name?: string;
}

const DeleteProjectCard = ({ name }: Props) => {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const deleteProject = trpc.project.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);
  const { projectId } = router.query as { projectId: string };

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
      button={t("general.delete.action")}
      onClick={onClickDeleteProject}
      text={t("general.delete.project.placeholder")}
      isDisabled={deleteProject.isLoading}
      variant={CardVariant.DANGER}
      isLoading={deleteProject.isLoading}
    />
  );
};

export default DeleteProjectCard;
