import React, { useEffect } from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
// Components
import { Input } from "@basestack/design-system";
import SettingCard from "../SettingCard";
// Types
import { ProjectSettings } from "types";
import { Role } from "@prisma/client";
// Locales
import useTranslation from "next-translate/useTranslation";

type Props = ProjectSettings;

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "general.project.inputs.name.error.max")
    .min(1, "general.project.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const ProjectNameCard = ({ project }: Props) => {
  const { t } = useTranslation("settings");
  const trpcContext = trpc.useContext();
  const updateProject = trpc.project.update.useMutation();

  const isAdmin = project.role === Role.ADMIN;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const onSaveProjectName: SubmitHandler<FormInputs> = async (input) => {
    updateProject.mutate(
      {
        projectId: project.id,
        name: input.name,
      },
      {
        onSuccess: (result) => {
          // Get all the projects on the cache
          const cacheAllProjects = trpcContext.project.all.getData();

          if (cacheAllProjects && cacheAllProjects.projects) {
            // Update the cache with the new data
            // This updates in the navigation list
            trpcContext.project.all.setData(undefined, {
              projects: cacheAllProjects.projects.map((project) =>
                project.id === result.project.id
                  ? { ...project, name: result.project.name }
                  : project,
              ),
            });
          }

          const cacheProject = trpcContext.project.bySlug.getData({
            projectSlug: result.project.slug,
          });

          if (cacheProject && cacheProject.project) {
            // Updates the current active project in the cache
            trpcContext.project.bySlug.setData(
              { projectSlug: result.project.slug },
              {
                project: {
                  ...cacheProject.project,
                  name: result.project.name,
                },
              },
            );
          }
        },
      },
    );
  };

  useEffect(() => {
    if (project) {
      setValue("name", project.name!);
    }
  }, [project, setValue]);

  return (
    <SettingCard
      title={t("general.project.title")}
      description={t("general.project.description")}
      button={t("general.project.action")!}
      onClick={handleSubmit(onSaveProjectName)}
      isDisabled={isSubmitting || !project || updateProject.isLoading}
      isLoading={isSubmitting || updateProject.isLoading}
      hasFooter={isAdmin}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            maxWidth={400}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={t("general.project.inputs.name.placeholder")}
            name={field.name}
            value={field.value}
            hasError={!!errors.name}
            isDisabled={isSubmitting || !project || !isAdmin}
          />
        )}
      />
    </SettingCard>
  );
};

export default ProjectNameCard;
