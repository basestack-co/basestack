import { Modal, Select } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Libs
import { auth } from "@basestack/vendors";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Store
import { useStore } from "store";
// Libs
import { api } from "utils/trpc/react";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";

export const FormSchema = z.object({
  member: z.object({
    userId: z.string().min(1, "member.add.input.select.error.min"),
    role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
  }),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const AddFormMemberModal = () => {
  const t = useTranslations("modal");
  const { data: session } = auth.client.useSession();
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
    t.teams.list(undefined, {
      enabled: isModalOpen && !!formId,
    }),
    t.formMembers.list({ formId }, { enabled: isModalOpen && !!formId }),
  ]);

  const addUserToForm = api.formMembers.create.useMutation();

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
              await trpcUtils.formMembers.list.invalidate({ formId });
              onClose();
            },
            onError: (error: any) => {
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
