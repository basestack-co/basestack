import React from "react";
// Components
import { Button, Text, InputGroup } from "@basestack/design-system";
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
// Form
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Locales
import { useTranslations } from "next-intl";
// Styles
import { InputGroupContainer, InputGroupWrapper } from "./styles";
// Utils
import { isEmptyObject } from "@basestack/utils";
// types
import { Role } from ".prisma/client";

export const FormSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  teamId: string;
}

const InviteForm = ({ teamId }: Props) => {
  const t = useTranslations("modal");
  const trpcUtils = api.useUtils();
  const invite = api.teamInvites.create.useMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    delayError: 250,
    defaultValues: {
      email: "",
    },
  });

  const email = watch("email");

  const onSendInvite: SubmitHandler<FormInputs> = async (input) => {
    if (!!input.email) {
      invite.mutate(
        { teamId, email: input.email, role: Role.VIEWER },
        {
          onSuccess: async () => {
            await trpcUtils.teams.byId.invalidate({ teamId });
            toast.success("Invitation sent successfully");
            reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  return (
    <>
      <Text size="small" fontWeight={500}>
        {t("team.manage.tab.invites.title")}
      </Text>
      <InputGroupContainer>
        <InputGroupWrapper>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <InputGroup
                hint={errors.email?.message}
                inputProps={{
                  type: "text",
                  name: field.name,
                  value: field.value as string,
                  onChange: field.onChange,
                  onBlur: field.onBlur,
                  placeholder: t(
                    "team.manage.tab.invites.form.email.placeholder",
                  ),
                  hasError: !!errors.email,
                  isDisabled: isSubmitting,
                }}
              />
            )}
          />
        </InputGroupWrapper>
        <Button
          onClick={handleSubmit(onSendInvite)}
          isDisabled={isSubmitting || !isEmptyObject(errors) || !email}
          isLoading={isSubmitting}
        >
          {t("team.manage.tab.invites.form.submit")}
        </Button>
      </InputGroupContainer>
    </>
  );
};

export default InviteForm;
