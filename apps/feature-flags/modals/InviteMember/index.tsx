import React, { useCallback, useMemo } from "react";
import Portal from "@basestack/design-system/global/Portal";
import { Modal, Select } from "@basestack/design-system";
import { useTheme } from "styled-components";
// Store
import { useStore } from "store";
// Form
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Libs
import { RouterOutput, trpc } from "libs/trpc";

export const FormSchema = z.object({
  memberId: z.string().min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const InviteMemberModal = () => {
  const theme = useTheme();
  const trpcContext = trpc.useContext();
  const isModalOpen = useStore((state) => state.isInviteMemberModalOpen);
  const setInviteMemberModalOpen = useStore(
    (state) => state.setInviteMemberModalOpen
  );

  const modalPayload = useStore((state) => state.inviteMemberModalPayload);

  const { data, isLoading } = trpc.user.all.useQuery(
    {
      projectId: modalPayload?.project?.id!,
    },
    {
      enabled: !!isModalOpen && !!modalPayload?.project?.id,
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
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
  }, [setInviteMemberModalOpen]);

  const onSubmit: SubmitHandler<FormInputs> = useCallback(
    (input: FormInputs) => {
      console.log("input = ", input);
    },
    []
  );

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
              !modalPayload?.project?.id || !options.length || isSubmitting,
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
              placeholder="Select member from the list"
              options={options}
              value={
                (options &&
                  options.find((option) => option.value === field.value)) ||
                []
              }
              onChange={(val) => field.onChange((val && val.value) || "")}
              isDisabled={!options.length}
              isLoading={!options.length}
              isClearable
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default InviteMemberModal;
