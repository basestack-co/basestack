import React from "react";
// Components
import { SettingCard } from "@basestack/design-system";
// Server
import { RouterOutput, trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const DeleteProjectCard = ({ project }: Props) => {
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const deleteProject = trpc.project.delete.useMutation();

  deleteProject.isLoading;

  const onDeleteProject = () => {
    if (project) {
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
                (project) => project.id !== result.project.id
              );

              // Update the cache with the new data
              trpcContext.project.all.setData(undefined, { projects });
            }

            await router.replace("/");
          },
        }
      );
    }
  };

  return (
    <SettingCard
      title="Delete Project"
      description="The project will be permanently deleted, including its environments and feature flags."
      button="Delete"
      onClick={onDeleteProject}
      text="Warning: This action is not reversible. Please be certain."
      isDisabled={deleteProject.isLoading}
      variant="danger"
      isLoading={deleteProject.isLoading}
    />
  );
};

export default DeleteProjectCard;
