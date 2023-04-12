import React, { useEffect } from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { RouterOutput, trpc } from "libs/trpc";
// Components
import { Input, SettingCard } from "@basestack/design-system";

interface Props {
  project: RouterOutput["project"]["bySlug"]["project"];
}

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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormInputs>({
    // @ts-ignore
    resolver: zodResolver(FormSchema), // TODO: fix this, broken after the 3.0.0 release
    mode: "onChange",
  });

  const onSaveProjectName: SubmitHandler<FormInputs> = async (input) => {
    if (project) {
      updateProject.mutate(
        {
          projectId: project.id,
          name: input.name,
        },
        {
          onSuccess: async (result) => {
            // Get all the projects on the cache
            const prev = trpcContext.project.all.getData();

            if (prev && prev.projects) {
              // Find the project and update with the new name
              const projects = prev.projects.map((project) =>
                project.id === result.project.id
                  ? { ...project, name: result.project.name }
                  : project
              );

              // Find the current selected and updated project
              const project =
                projects.find((project) => project.id === result.project.id) ??
                null;

              // Update the cache with the new data
              // This updates in the navigation list
              trpcContext.project.all.setData(undefined, { projects });
              // Updates the current active project in the cache
              trpcContext.project.bySlug.setData(
                { projectSlug: result.project.slug },
                {
                  project,
                }
              );
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
    }
  }, [project, setValue]);

  return (
    <SettingCard
      title="Project Name"
      description="Used to identify your Project on the Dashboard."
      button="Update"
      onClick={handleSubmit(onSaveProjectName)}
      isDisabled={isSubmitting || !project || updateProject.isLoading}
      isLoading={isSubmitting || updateProject.isLoading}
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
            isDisabled={isSubmitting || !project}
          />
        )}
      />
    </SettingCard>
  );
};

export default ProjectNameCard;
