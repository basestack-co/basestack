import React, { useEffect } from "react";
// Router
import { useRouter } from "next/router";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
// Components
import { Input } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Types
import { Role } from "@prisma/client";
// Locales
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation("settings");
  const router = useRouter();
  const trpcUtils = trpc.useUtils();
  const updateProject = trpc.project.update.useMutation();
  const { projectId } = router.query as { projectId: string };
  const isAdmin = role === Role.ADMIN;

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
      isDisabled={isSubmitting || !name || updateProject.isLoading}
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
            isDisabled={isSubmitting || !name || !isAdmin}
          />
        )}
      />
    </SettingCard>
  );
};

export default ProjectNameCard;
