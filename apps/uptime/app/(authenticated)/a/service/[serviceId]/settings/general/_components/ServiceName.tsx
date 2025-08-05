// Types
import { Role } from ".prisma/client";
// Components
import { InputGroup } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { isEmptyObject } from "@basestack/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import { useEffect } from "react";
// Form
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "general.service.inputs.name.error.max")
    .min(1, "general.service.inputs.name.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  role?: Role;
  name?: string;
}

const ServiceNameCard = ({ role, name }: Props) => {
  const t = useTranslations("setting");
  const trpcUtils = api.useUtils();
  const updateService = api.services.update.useMutation();
  const { serviceId } = useParams<{ serviceId: string }>();
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

  const onSaveServiceName: SubmitHandler<FormInputs> = async (input) => {
    updateService.mutate(
      {
        serviceId,
        name: input.name,
      },
      {
        onSuccess: (result) => {
          // Get all the projects on the cache
          const cacheAllServices = trpcUtils.services.list.getData();

          if (cacheAllServices?.services) {
            // Update the cache with the new data
            // This updates in the navigation list
            trpcUtils.services.list.setData(undefined, {
              services: cacheAllServices.services.map((service) =>
                service.id === result.service.id
                  ? { ...service, name: result.service.name }
                  : service
              ),
            });
          }

          const cacheService = trpcUtils.services.byId.getData({
            serviceId: result.service.id,
          });

          if (cacheService) {
            // Updates the current active project in the cache
            trpcUtils.services.byId.setData(
              { serviceId: result.service.id },
              {
                ...cacheService,
                name: result.service.name,
              }
            );
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (name) {
      setValue("name", name!);
    }
  }, [name, setValue]);

  return (
    <SettingCard
      title={t("general.service.title")}
      description={t("general.service.description")}
      button={t("general.service.action")!}
      onClick={handleSubmit(onSaveServiceName)}
      isDisabled={
        isSubmitting ||
        !name ||
        updateService.isPending ||
        name === inputName ||
        !isEmptyObject(errors)
      }
      isLoading={isSubmitting || updateService.isPending}
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
              placeholder: t("general.service.inputs.name.placeholder"),
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

export default ServiceNameCard;
