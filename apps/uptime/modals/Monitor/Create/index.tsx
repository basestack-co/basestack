import { InputGroup, Modal } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams, useRouter } from "next/navigation";
// Locales
import { type NamespaceKeys, useTranslations } from "next-intl";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Server
import { api } from "utils/trpc/react";
// Utils
import { z } from "zod";
// Store
import { useShallow } from "zustand/react/shallow";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "project.create.input.project-name.error.max")
    .min(1, "project.create.input.project-name.error.min"),
  url: z.string().url(),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  headers: z.record(z.string(), z.string()),
  timeout: z.number().min(1).max(300),
  expectedStatus: z.number().min(100).max(599),
  keyword: z.string(),
  port: z.number().min(1).max(65535),
  interval: z.number().min(1).max(300),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateMonitorModal = () => {
  const t = useTranslations("modal");
  const trpcUtils = api.useUtils();

  const { projectId } = useParams<{ projectId: string }>();

  const [isModalOpen, setCreateMonitorModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateMonitorModalOpen,
        state.setCreateMonitorModalOpen,
        state.closeModalsOnClickOutside,
      ])
    );

  const createMonitor = api.projectMonitors.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onClose = () => setCreateMonitorModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createMonitor.mutate(
      { ...data, projectId },
      {
        onSuccess: async () => {
          await trpcUtils.projectMonitors.list.invalidate({
            projectId,
          });
          onClose();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const isSubmittingOrMutating = isSubmitting || createMonitor.isPending;

  return (
    <Portal selector="#portal">
      <Modal
        title={t("project.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("project.create.button.cancel"), onClick: onClose },
          {
            children: t("project.create.button.submit"),
            onClick: handleSubmit(onSubmit),
            isLoading: isSubmittingOrMutating,
            isDisabled: isSubmittingOrMutating,
          },
        ]}
        onAnimationEnd={reset}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title={t("project.create.input.project-name.title")}
              hint={
                errors.name?.message
                  ? t(errors.name?.message as NamespaceKeys<string, "modal">)
                  : ""
              }
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: "E.g. My Project",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />

        <button
          type="button"
          onClick={() => {
            createMonitor.mutate({
              url: "https://www.google.com",
              method: "GET",
              name: "TEST",
              headers: {},
              timeout: 100,
              expectedStatus: 200,
              keyword: "",
              port: 80,
              interval: 60,
              projectId,
            });
          }}
        >
          TEST
        </button>
      </Modal>
    </Portal>
  );
};

export default CreateMonitorModal;
