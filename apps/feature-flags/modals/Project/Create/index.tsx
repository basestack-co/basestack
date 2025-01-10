import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
// Router
import { useRouter } from "next/navigation";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Theme
import { useTheme } from "styled-components";
// Components
import Portal from "@basestack/design-system/global/Portal";
import { Modal, InputGroup, IconButton } from "@basestack/design-system";
// Store
import { useStore } from "store";
import { useShallow } from "zustand/react/shallow";
// Server
import { api } from "utils/trpc/react";
// Utils
import { generateSlug } from "random-word-slugs";
import { slugify } from "@basestack/utils";
// Hooks
import { useDebounce } from "react-use";
// Locales
import { NamespaceKeys, useTranslations } from "next-intl";
// Styles
import { IconButtonContainer, SlugContainer } from "./styles";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "project.create.input.project-name.error.max")
    .min(1, "project.create.input.project-name.error.min"),
  slug: z
    .string()
    .max(150, "project.create.input.slug.error.max")
    .min(1, "project.create.input.slug.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const AnimatedIconButton = animated(IconButtonContainer);

const CreateProjectModal = () => {
  const t = useTranslations("modal");
  const theme = useTheme();
  const router = useRouter();
  const trpcUtils = api.useUtils();
  const [numberOfRefresh, setNumberOfRefresh] = useState(0);
  const [isModalOpen, setCreateProjectModalOpen, closeModalsOnClickOutside] =
    useStore(
      useShallow((state) => [
        state.isCreateProjectModalOpen,
        state.setCreateProjectModalOpen,
        state.closeModalsOnClickOutside,
      ]),
    );

  const createProject = api.project.create.useMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const watchName = watch("name");
  const watchSlug = watch("slug");

  const isSubmittingOrMutating = isSubmitting || createProject.isPending;

  const onClose = () => setCreateProjectModalOpen({ isOpen: false });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    createProject.mutate(data, {
      onSuccess: async (result) => {
        // Get all the projects on the cache
        const prev = trpcUtils.project.all.getData();

        if (prev && prev.projects) {
          // Add the new project with the others
          const projects = [result.project, ...prev.projects];

          // Update the cache with the new data
          trpcUtils.project.all.setData(undefined, { projects });
        }

        onClose();

        await router.push(`/a/project/${result.project.id}/flags`);
      },
    });
  };

  useDebounce(
    () => {
      // Only update the slug if the user hasn't typed anything
      if (watchName && !watchSlug) {
        setValue("slug", watchName);
      }
    },
    500,
    [watchName],
  );

  const refreshTransition = useSpring({
    from: { transform: "rotate(0deg)" },
    to: { transform: `rotate(${360 * numberOfRefresh}deg)` },
  });

  return (
    <Portal selector="#portal">
      <Modal
        title={t("project.create.title")}
        expandMobile
        isOpen={isModalOpen}
        onClose={onClose}
        buttons={[
          { children: t("project.create.button.cancel"), onClick: onClose },
          {
            children: t("project.create.button.submit"),
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
              title={t("project.create.input.project-name.title")}
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
                placeholder: "E.g. Chat",
                hasError: !!errors.name,
                isDisabled: isSubmitting,
              }}
              mb={theme.spacing.s6}
            />
          )}
        />
        <SlugContainer>
          <Controller
            name="slug"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputGroup
                title={t("project.create.input.slug.title")}
                hint={
                  errors.slug?.message
                    ? t(errors.slug?.message as NamespaceKeys<string, "modal">)
                    : ""
                }
                inputProps={{
                  name: "slug",
                  value: slugify(field.value),
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: "pr-chat",
                  hasError: !!errors.slug,
                  isDisabled: isSubmitting,
                }}
              />
            )}
          />
          <AnimatedIconButton style={refreshTransition}>
            <IconButton
              size="medium"
              icon="refresh"
              onClick={() => {
                setNumberOfRefresh((prevState) => prevState + 1);
                setValue("slug", generateSlug());
              }}
            />
          </AnimatedIconButton>
        </SlugContainer>
      </Modal>
    </Portal>
  );
};

export default CreateProjectModal;
