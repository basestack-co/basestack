import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { Modal, InputGroup } from "@basestack/design-system";
import Portal from "@basestack/design-system/global/Portal";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Context
import useModals from "hooks/useModals";
import { setIsCreateEnvironmentModalOpen } from "contexts/modals/actions";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Router
import { useRouter } from "next/router";
import { HistoryAction } from "../../types/history";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "Must be 30 characters or less")
    .min(1, "Required field"),
  description: z
    .string()
    .max(250, "Must be 250 characters or less")
    .min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const CreateEnvironmentModal = () => {
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();
  const theme = useTheme();
  const {
    dispatch,
    state: { isCreateEnvironmentModalOpen: isModalOpen },
  } = useModals();

  const [textareaLength, setTextareaLength] = useState("");

  const projectSlug = router.query.projectSlug as string;

  const { data: current } = trpc.useQuery(["project.bySlug", { projectSlug }], {
    enabled: !!projectSlug && isModalOpen,
  });

  const createEnvironment = trpc.useMutation(["environment.create"]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onClose = useCallback(() => {
    dispatch(setIsCreateEnvironmentModalOpen(false));
    reset();
  }, [dispatch, reset]);

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 250) {
        setTextareaLength(text);
      }

      setValue("description", text);
    },
    [textareaLength, setValue]
  );

  const onSubmit: SubmitHandler<FormInputs> = async (input: FormInputs) => {
    if (current && current.project) {
      await createEnvironment.mutate(
        {
          name: input.name,
          description: input.description,
          projectId: current.project.id,
        },
        {
          onSuccess: async (result) => {
            console.log("result = ", result);
            // Get all the environments by project on the cache
            const prev = trpcContext.getQueryData([
              "environment.all",
              { projectSlug },
            ]);

            if (prev && prev.environments) {
              const environments = [result.environment, ...prev.environments];

              // Update the cache with the new data
              trpcContext.setQueryData(["environment.all", { projectSlug }], {
                environments,
              });
            }
          },
        }
      );

      onClose();
    }
  };

  return (
    <Portal selector="#portal">
      <Modal
        title="Create New Environment"
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: "Close", onClick: onClose },
          { children: "Create", onClick: handleSubmit(onSubmit) },
        ]}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title="Environment name"
              hint={errors.name?.message}
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: "E.g. development",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
              mb={theme.spacing.s6}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title="Description"
              label={`${textareaLength.length} / 250`}
              textarea
              textareaProps={{
                name: field.name,
                value: field.value ?? "",
                onChange: onChangeTextarea,
                onBlur: field.onBlur,
                placeholder: "Environment description",
                maxlength: "250",
                hasError: !!errors.description,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />
      </Modal>
    </Portal>
  );
};

export default CreateEnvironmentModal;
