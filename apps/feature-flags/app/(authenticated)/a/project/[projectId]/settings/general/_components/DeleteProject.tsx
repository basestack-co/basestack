import { CardVariant } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";

export interface Props {
  name?: string;
}

const DeleteProjectCard = ({ name }: Props) => {
  const t = useTranslations("setting");
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const deleteProject = api.projects.delete.useMutation();
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
          const prev = trpcUtils.projects.list.getData();

          if (prev?.projects) {
            // Find the project and remove from the list
            const projects = prev.projects.filter(
              (project) => project.id !== result.project.id,
            );

            // Update the cache with the new data
            trpcUtils.projects.list.setData(undefined, { projects });
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
