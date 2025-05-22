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
// Auth
import { useSession } from "next-auth/react";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";

export const FormSchema = z.object({
  member: z.object({
    userId: z.string().min(1, "member.add.input.select.error.min"),
    role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
  }),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const AddFormMemberModal = () => {
  const t = useTranslations("modal");
  const { data: session } = useSession();
  const { formId } = useParams<{ formId: string }>();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setAddFormMemberModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isAddFormMemberModalOpen,
        state.setAddFormMemberModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const [team, members] = api.useQueries((t) => [
    t.team.all(undefined, {
      enabled: isModalOpen && !!formId,
    }),
    t.form.members({ formId }, { enabled: isModalOpen && !!formId }),
  ]);

  const addUserToForm = api.form.addMember.useMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const isSubmittingOrMutating = isSubmitting || addUserToForm.isPending;

  const options = useMemo(() => {
    if (!team.isLoading && team.data && !members.isLoading && members.data) {
      const projectUserIds =
        members.data?.users.map((user) => user.userId) ?? [];

      return team.data
        .filter((team) =>
          team.members.some(
            (member) =>
              member.userId === session?.user.id && member.role === "ADMIN",
          ),
        )
        .map((team) => ({
          label: t("team.manage.title", { name: team.name }),
          options: team.members
            .filter(
              (member) =>
                member.userId !== session?.user.id &&
                !projectUserIds.includes(member.userId),
            )
            .map((member) => ({
              label: member.user.name,
              value: member.userId,
              role: member.role,
            })),
        }));
    }

    return [];
  }, [
    team.isLoading,
    team.data,
    members.isLoading,
    members.data,
    session?.user.id,
    t,
  ]);

  const onClose = useCallback(() => {
    setAddFormMemberModalOpen({ isOpen: false });
    reset();
  }, [setAddFormMemberModalOpen, reset]);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (input: FormInputs) => {
      if (formId) {
        addUserToForm.mutate(
          { formId, userId: input.member.userId, role: input.member.role },
          {
            onSuccess: async () => {
              await trpcUtils.form.recent.invalidate();
              await trpcUtils.form.members.invalidate();
              onClose();
            },
            onError: (error) => {
              toast.error(error.message);
            },
          },
        );
      }
    },
    [addUserToForm, formId, onClose, trpcUtils],
  );

  const onChangeMember = useCallback((option: unknown, setField: any) => {
    const { value, role } = option as { value: string; role: string };

    if (value) {
      setField({ userId: value, role });
    }
  }, []);

  return (
    <Portal selector="#portal">
      <Modal
        title={t("member.add.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("member.add.button.cancel"), onClick: onClose },
          {
            children: t("member.add.button.submit"),
            onClick: handleSubmit(onSubmit),
            isDisabled:
              !formId || !options.length || isSubmittingOrMutating || !isValid,
            isLoading: isSubmittingOrMutating,
          },
        ]}
        closeOnClickOutside={closeModalsOnClickOutside}
      >
        <Controller
          name="member"
          control={control}
          defaultValue={{ userId: "", role: "VIEWER" }}
          render={({ field }) => (
            <Select
              ref={field.ref}
              placeholder={t("member.add.input.select.default")}
              options={options}
              onChange={(option) => onChangeMember(option, field.onChange)}
              isLoading={team.isLoading || members.isLoading}
              noOptionsMessage={() => t("member.add.input.select.empty")}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default AddFormMemberModal;
