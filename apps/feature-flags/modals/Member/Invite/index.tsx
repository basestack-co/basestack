import React, { useCallback, useMemo } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Select } from "@basestack/design-system";
// Store
import { useStore } from "store";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Libs
import { trpc } from "libs/trpc";
// Locales
import useTranslation from "next-translate/useTranslation";

export const FormSchema = z.object({
  memberId: z.string().min(1, "member.invite.input.member-id.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const InviteMemberModal = () => {
  const { t } = useTranslation("modals");
  const trpcUtils = trpc.useUtils();
  const isModalOpen = useStore((state) => state.isInviteMemberModalOpen);
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen,
  );
  const payload = useStore((state) => state.inviteMemberModalPayload);
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );

  const { data, isLoading } = trpc.user.all.useQuery(
    {
      excludeProjectId: payload?.project?.id!,
    },
    {
      enabled: isModalOpen && !!payload?.project?.id,
    },
  );

  const addUserToProject = trpc.project.addMember.useMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || addUserToProject.isLoading;

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
      if (payload && payload.project) {
        addUserToProject.mutate(
          { projectId: payload?.project?.id!, userId: input.memberId },
          {
            onSuccess: async (result) => {
              await trpcUtils.project.members.invalidate();
              onClose();
            },
          },
        );
      }
    },
    [addUserToProject, payload, onClose, trpcUtils],
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
            isDisabled:
              !payload?.project?.id ||
              !options.length ||
              isSubmittingOrMutating,
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
