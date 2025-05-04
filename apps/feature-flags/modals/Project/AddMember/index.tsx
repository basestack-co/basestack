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
    userId: z.string().min(1, "member.invite.input.member-id.error.min"),
    role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
  }),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const AddMemberProjectModal = () => {
  const t = useTranslations("modal");
  const { data: session } = useSession();
  const { projectId } = useParams<{ projectId: string }>();
  const trpcUtils = api.useUtils();
  const [isModalOpen, setAddMemberProjectModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isAddMemberProjectModalOpen,
        state.setAddMemberProjectModalOpen,
        state.closeModalsOnClickOutside,
      ])
    );

  const { data, isLoading } = api.team.all.useQuery(undefined, {
    enabled: isModalOpen && !!projectId,
  });

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
      return data
        .filter((team) =>
          team.members.some(
            (member) =>
              member.userId === session?.user.id && member.role === "ADMIN"
          )
        )
        .map((team) => ({
          label: t("team.manage.title", { name: team.name }),
          options: team.members
            .filter((member) => member.userId !== session?.user.id)
            .map((member) => ({
              label: member.user.name,
              value: member.userId,
              role: member.role,
            })),
        }));
    }

    return [];
  }, [isLoading, data, session?.user.id, t]);

  const onClose = useCallback(() => {
    setAddMemberProjectModalOpen({ isOpen: false });
    reset();
  }, [setAddMemberProjectModalOpen, reset]);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (input: FormInputs) => {
      if (projectId) {
        addUserToProject.mutate(
          { projectId, userId: input.member.userId, role: input.member.role },
          {
            onSuccess: async () => {
              await trpcUtils.project.members.invalidate();
              onClose();
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    },
    [addUserToProject, projectId, onClose, trpcUtils]
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
          name="member"
          control={control}
          defaultValue={{ userId: "", role: "VIEWER" }}
          render={({ field }) => (
            <Select
              ref={field.ref}
              placeholder={
                !options.length
                  ? t("member.invite.input.member-id.empty")
                  : t("member.invite.input.member-id.default")
              }
              options={options}
              onChange={(option) => onChangeMember(option, field.onChange)}
              isDisabled={!options.length}
              isLoading={isLoading}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default AddMemberProjectModal;
