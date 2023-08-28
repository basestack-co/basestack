import React from "react";
// Store
import { useStore } from "store";
// Components
import SettingCard from "../SettingCard";
// Server
import { trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";
// Types
import { ProjectSettings } from "types";
// Locales
import useTranslation from "next-translate/useTranslation";

type Props = ProjectSettings;

const DeleteProjectCard = ({ project }: Props) => {
  const { t } = useTranslation("settings");
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const deleteProject = trpc.project.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);

  const onDeleteProject = () => {
    deleteProject.mutate(
      {
        projectId: project.id,
      },
      {
        onSuccess: async (result) => {
          // Get all the projects on the cache
          const prev = trpcContext.project.all.getData();

          if (prev && prev.projects) {
            // Find the project and remove from the list
            const projects = prev.projects.filter(
              (project) => project.id !== result.project.id,
            );

            // Update the cache with the new data
            trpcContext.project.all.setData(undefined, { projects });
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
        title: t("general.delete.modal.title"),
        description: t("general.delete.modal.description", {
          name: `<b>${project.name}</b>`,
        }),
        type: "delete",
        buttonText: t("general.delete.modal.action"),
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
      title={t("general.delete.title")}
      description={t("general.delete.description")}
      button={t("general.delete.action")}
      onClick={onClickDeleteProject}
      text={t("general.delete.placeholder")}
      isDisabled={deleteProject.isLoading}
      variant="danger"
      isLoading={deleteProject.isLoading}
    />
  );
};

export default DeleteProjectCard;
