import React, { useEffect } from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Components
import { Input, SettingCard } from "@basestack/design-system";
// Types
import { HistoryAction } from "types/history";
// Libs
import { inferQueryOutput } from "libs/trpc";

interface Props {
  project: inferQueryOutput<"project.bySlug">["project"];
}

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "Must be 30 characters or less")
    .min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const ProjectName = ({ project }: Props) => {
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();

  const updateProject = trpc.useMutation(["project.update"]);

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
    if (project) {
      updateProject.mutate(
        {
          projectId: project.id!,
          name: input.name,
        },
        {
          onSuccess: async (result) => {
            // Get all the projects on the cache
            const prev = trpcContext.getQueryData(["project.all"]);

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
              trpcContext.setQueryData(["project.all"], { projects });
              // Updates the current active project in the cache
              trpcContext.setQueryData(
                ["project.bySlug", { projectSlug: result.project.slug }],
                {
                  project,
                }
              );
            }

            // Create new history entry on updating the project name
            onCreateHistory(HistoryAction.updateProject, {
              projectId: result.project.id,
              payload: {
                project: {
                  name: result.project.name,
                  slug: result.project.slug,
                },
              },
            });
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
      title="Project name"
      description="Used to identify your Project on the Dashboard."
      button="Save"
      onClick={handleSubmit(onSaveProjectName)}
      text="Learn more about Project Name"
      isDisabled={isSubmitting || !project}
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

export default ProjectName;
