import React, { useCallback, useMemo } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Select } from "@basestack/design-system";
// Router
import { useParams } from "next/navigation";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Libs
import { api } from "utils/trpc/react";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";

export const FormSchema = z.object({
  memberId: z.string().min(1, "member.invite.input.member-id.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const InviteMemberModal = () => {
  const t = useTranslations("modal");
  const { projectId } = useParams<{ projectId: string }>();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setInviteMemberModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isInviteMemberModalOpen,
        state.setInviteMemberModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const { data, isLoading } = api.user.all.useQuery(
    {
      excludeProjectId: projectId,
    },
    {
      enabled: isModalOpen && !!projectId,
    },
  );

  const addUserToProject = api.project.addMember.useMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || addUserToProject.isPending;

  const options = useMemo(() => {
    if (!isLoading && data) {
      return data.users.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    }

    return [];
  }, [isLoading, data]);

  const onClose = useCallback(() => {
    setInviteMemberModalOpen({ isOpen: false });
    reset();
  }, [setInviteMemberModalOpen, reset]);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (input: FormInputs) => {
      if (projectId) {
        addUserToProject.mutate(
          { projectId, userId: input.memberId },
          {
            onSuccess: async () => {
              await trpcUtils.project.members.invalidate();
              onClose();
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    },
    [addUserToProject, projectId, onClose, trpcUtils],
  );

  const onChangeMember = useCallback((option: unknown, setField: any) => {
    if (option) {
      const { value } = option as (typeof options)[0];
      setField(value);
    }
  }, []);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("member.invite.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("member.invite.button.cancel"), onClick: onClose },
          {
            children: t("member.invite.button.submit"),
            onClick: handleSubmit(onSubmit),
            isDisabled: !projectId || !options.length || isSubmittingOrMutating,
            isLoading: isSubmittingOrMutating,
          },
        ]}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Controller
          name="memberId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              ref={field.ref}
              placeholder={
                !options.length
                  ? t("member.invite.input.member-id.empty")
                  : t("member.invite.input.member-id.default")
              }
              options={options}
              value={
                (options &&
                  options.find((option) => option.value === field.value)) ||
                []
              }
              onChange={(option) => onChangeMember(option, field.onChange)}
              isDisabled={!options.length}
              isLoading={isLoading}
              isClearable
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default InviteMemberModal;
