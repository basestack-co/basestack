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

const DeleteServiceCard = ({ name }: Props) => {
  const t = useTranslations("setting");
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const deleteService = api.services.delete.useMutation();
  const setConfirmModalOpen = useStore((state) => state.setConfirmModalOpen);
  const { serviceId } = useParams<{ serviceId: string }>();

  const onDeleteService = () => {
    deleteService.mutate(
      {
        serviceId,
      },
      {
        onSuccess: async (result) => {
          // Get all the projects on the cache
          const prev = trpcUtils.services.list.getData();

          if (prev?.services) {
            // Find the project and remove from the list
            const services = prev.services.filter(
              (service) => service.id !== result.service.id,
            );

            // Update the cache with the new data
            trpcUtils.services.list.setData(undefined, { services });
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
        title: t("general.delete.service.modal.title"),
        description: t("general.delete.service.modal.description", {
          name: `<b>${name}</b>`,
        }),
        type: "delete",
        buttonText: t("general.delete.service.modal.action"),
        onClick: () => {
          onDeleteService();
          setConfirmModalOpen({
            isOpen: false,
          });
        },
      },
    });
  };

  return (
    <SettingCard
      title={t("general.delete.service.title")}
      description={t("general.delete.service.description")}
      button={t("general.delete.service.action")}
      onClick={onClickDeleteProject}
      text={t("general.delete.service.placeholder")}
      isDisabled={deleteService.isPending}
      variant={CardVariant.DANGER}
      isLoading={deleteService.isPending}
    />
  );
};

export default DeleteServiceCard;
