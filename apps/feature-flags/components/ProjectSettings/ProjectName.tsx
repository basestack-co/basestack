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

type Props = ProjectSettings;

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "Must be 30 characters or less")
    .min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const ProjectNameCard = ({ project }: Props) => {
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
      title="Project Name"
      description="A name used to identify your project on the dashboard."
      button="Update"
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
            placeholder="Project name"
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
