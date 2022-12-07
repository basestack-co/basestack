import React from "react";
// Components
import {  SettingCard } from "@basestack/design-system";
// Server
import { RouterOutput, trpc } from "libs/trpc";
// Router
import { useRouter } from "next/router";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

const DeleteProject = ({ project }: Props) => {
  const router = useRouter();
  const deleteProject = trpc.project.delete.useMutation();

  deleteProject.isLoading

  const onDeleteProject = () => {
    if (project) {
      deleteProject.mutate(
        {
          projectId: project.id,
        },
        {
          onSuccess: async () => {
            await router.push("/");
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

export default DeleteProject;
