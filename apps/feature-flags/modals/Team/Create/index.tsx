import { InputGroup, Modal } from "@basestack/design-system";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "team.create.input.team-name.error.max")
    .min(1, "team.create.input.team-name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateTeamModal = () => {
  const t = useTranslations("modal");
  const trpcUtils = api.useUtils();
  const [isModalOpen, setCreateTeamModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateTeamModalOpen,
        state.setCreateTeamModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createTeam = api.teams.create.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || createTeam.isPending;

  const onClose = () => setCreateTeamModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createTeam.mutate(data, {
      onSuccess: async () => {
        await trpcUtils.teams.list.invalidate();

        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Portal selector="#portal">
      <Modal
        title={t("team.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("team.create.button.cancel"), onClick: onClose },
          {
            children: t("team.create.button.submit"),
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
              title={t("team.create.input.team-name.title")}
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
                placeholder: "E.g. QA",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CreateTeamModal;
