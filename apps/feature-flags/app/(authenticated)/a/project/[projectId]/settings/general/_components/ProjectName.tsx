import React, { useEffect } from "react";
// Router
import { useParams } from "next/navigation";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { api } from "utils/trpc/react";
// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { isEmptyObject } from "@basestack/utils";
// Types
import { Role } from ".prisma/client";
// Locales
import { useTranslations } from "next-intl";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "general.project.inputs.name.error.max")
    .min(1, "general.project.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  role?: Role;
  name?: string;
}

const ProjectNameCard = ({ role, name }: Props) => {
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateProject = api.project.update.useMutation();
  const { projectId } = useParams<{ projectId: string }>();
  const isAdmin = role === Role.ADMIN;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const inputName = watch("name");

  const onSaveProjectName: SubmitHandler<FormInputs> = async (input) => {
    updateProject.mutate(
      {
        projectId,
        name: input.name,
      },
      {
        onSuccess: (result) => {
          // Get all the projects on the cache
          const cacheAllProjects = trpcUtils.project.all.getData();

          if (cacheAllProjects && cacheAllProjects.projects) {
            // Update the cache with the new data
            // This updates in the navigation list
            trpcUtils.project.all.setData(undefined, {
              projects: cacheAllProjects.projects.map((project) =>
                project.id === result.project.id
                  ? { ...project, name: result.project.name }
                  : project,
              ),
            });
          }

          const cacheProject = trpcUtils.project.byId.getData({
            projectId: result.project.id,
          });

          if (cacheProject) {
            // Updates the current active project in the cache
            trpcUtils.project.byId.setData(
              { projectId: result.project.id },
              {
                ...cacheProject,
                name: result.project.name,
              },
            );
          }
        },
      },
    );
  };

  useEffect(() => {
    if (name) {
      setValue("name", name!);
    }
  }, [name, setValue]);

  return (
    <SettingCard
      title={t("general.project.title")}
      description={t("general.project.description")}
      button={t("general.project.action")!}
      onClick={handleSubmit(onSaveProjectName)}
      isDisabled={
        isSubmitting ||
        !name ||
        updateProject.isPending ||
        name === inputName ||
        !isEmptyObject(errors)
      }
      isLoading={isSubmitting || updateProject.isPending}
      hasFooter={isAdmin}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            hint={errors.name?.message ? t(errors.name?.message as never) : ""}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("general.project.inputs.name.placeholder"),
              hasError: !!errors.name,
              isDisabled: isSubmitting || !name || !isAdmin,
              maxWidth: 400,
            }}
          />
        )}
      />
    </SettingCard>
  );
};

export default ProjectNameCard;
