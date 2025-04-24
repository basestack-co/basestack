import React from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Theme
import { useTheme } from "styled-components";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Server
import { api } from "utils/trpc/react";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "team.create.input.team-name.error.max")
    .min(1, "team.create.input.team-name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateTeamModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setCreateTeamModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateTeamModalOpen,
        state.setCreateTeamModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createTeam = api.team.create.useMutation();

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
        await trpcUtils.team.all.invalidate();

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
