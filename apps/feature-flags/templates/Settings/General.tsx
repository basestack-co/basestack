import React, { useEffect } from "react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { trpc } from "libs/trpc";
import useCreateApiHistory from "libs/trpc/hooks/useCreateApiHistory";
// Components
import { Input, InputGroup, SettingCard } from "@basestack/design-system";
import { CardList, CardListItem } from "./styles";
// Types
import { HistoryAction } from "../../types/history";
// Router
import { useRouter } from "next/router";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "Must be 30 characters or less")
    .min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const General = () => {
  const trpcContext = trpc.useContext();
  const { onCreateHistory } = useCreateApiHistory();
  const router = useRouter();

  const projectSlug = router.query.projectSlug as string;

  const { data, isLoading } = trpc.useQuery(
    ["project.bySlug", { projectSlug }],
    {
      enabled: !!projectSlug,
    }
  );

  const updateProject = trpc.useMutation(["project.update"], {
    async onSuccess(data) {
      onCreateHistory(HistoryAction.updateProject, {
        projectId: data.project.id,
        payload: {
          project: {
            name: data.project.name,
            slug: data.project.slug,
          },
        },
      });

      await trpcContext.invalidateQueries(["project.all"]);
    },
  });

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

  const onSaveProjectName: SubmitHandler<FormInputs> = async (input) => {
    if (data && data.project) {
      await updateProject.mutate({
        projectId: data.project.id!,
        name: input.name,
      });
    }
  };

  useEffect(() => {
    if (!isLoading && data && data.project) {
      setValue("name", data.project.name);
    }
  }, [data, isLoading, setValue]);

  return (
    <CardList>
      <CardListItem>
        <SettingCard
          title="Project name"
          description="Used to identify your Project on the Dashboard."
          button="Save"
          onClick={handleSubmit(onSaveProjectName)}
          text="Learn more about Project Name"
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
                isDisabled={isSubmitting}
              />
            )}
          />
        </SettingCard>
      </CardListItem>
    </CardList>
  );
};

export default General;
