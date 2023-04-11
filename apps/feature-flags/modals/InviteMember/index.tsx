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

export const FormSchema = z.object({
  memberId: z.string().min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const InviteMemberModal = () => {
  const trpcContext = trpc.useContext();
  const isModalOpen = useStore((state) => state.isInviteMemberModalOpen);
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );
  const payload = useStore((state) => state.inviteMemberModalPayload);

  const { data, isLoading } = trpc.user.all.useQuery(
    {
      excludeProjectId: payload?.project?.id!,
    },
    {
      enabled: isModalOpen && !!payload?.project?.id,
    }
  );

  const addUserToProject = trpc.user.addToProject.useMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    // @ts-ignore
    resolver: zodResolver(FormSchema), // TODO: fix this, broken after the 3.0.0 release
    mode: "onChange",
  });

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
        console.log("input = ", input);

        addUserToProject.mutate(
          { projectId: payload?.project?.id!, userId: input.memberId },
          {
            onSuccess: async (result) => {
              // TODO: migrate this to use cache from useQuery
              await trpcContext.user.byProjectId.invalidate();
              onClose();
            },
          }
        );
      }
    },
    [addUserToProject, payload, onClose, trpcContext]
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
        title="Add Team Member"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          {
            children: "Add member",
            onClick: handleSubmit(onSubmit),
            isDisabled:
              !payload?.project?.id || !options.length || isSubmitting,
            isLoading: isSubmitting,
          },
        ]}
      >
        <Controller
          name="memberId"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              ref={field.ref}
              placeholder={!options.length ? "No members" : "Select member"}
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
