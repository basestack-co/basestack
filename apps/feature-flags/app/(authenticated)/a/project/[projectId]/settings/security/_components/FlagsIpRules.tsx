import React, { useEffect, useCallback } from "react";
// Router
import { useParams, useRouter } from "next/navigation";
// Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// Server
import { api } from "utils/trpc/react";
// UI
import { SettingCard } from "@basestack/ui";
// Components
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// Toast
import { toast } from "sonner";
// Locales
import { useTranslations } from "next-intl";
// Utils
import { PlanTypeId } from "@basestack/utils";
import { getWithPlanCardProps } from "../../utils";
// Styles
import { TagsContainer } from "../../styles";

export const FormSchema = z.object({
  ip: z.string().ip().optional().or(z.literal("")),
  ips: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  blockIpAddresses?: string;
  planId: PlanTypeId;
}

const FlagsIpRulesCard = ({ blockIpAddresses = "", planId }: Props) => {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateProject = api.project.update.useMutation();

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError,
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    delayError: 250,
    defaultValues: {
      ip: "",
      ips: [],
    },
  });

  const ipsValues = watch("ips");
  const ipValue = watch("ip");

  useEffect(() => {
    if (blockIpAddresses) {
      setValue("ips", blockIpAddresses.split(","));
    }
  }, [blockIpAddresses, setValue]);

  const onSave = useCallback(async () => {
    updateProject.mutate(
      {
        projectId,
        blockIpAddresses: ipsValues.join(","),
        feature: "hasBlockIPs",
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.project.byId.getData({
            projectId: result.project.id,
          });

          if (cache) {
            trpcUtils.project.byId.setData(
              { projectId: result.project.id },
              {
                ...cache,
                blockIpAddresses: result.project.blockIpAddresses,
              },
            );
          }

          toast.success(t("setting.security.ip-block-rules.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [ipsValues, updateProject, projectId, trpcUtils, t]);

  const onHandleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !errors.ip && ipValue) {
        const ipExists = ipsValues?.find((item) => item === ipValue);

        if (ipExists) {
          setError("ip", { message: "IP already exists" });
        } else {
          // Add the value to the list of IPs
          setValue("ips", [...(ipsValues ?? []), ipValue]);
          // Clean up the input for the next value
          setValue("ip", "");
        }
      }
    },
    [ipValue, setValue, ipsValues, errors, setError],
  );

  const onDeleteIp = useCallback(
    (value: string) => {
      const ips = ipsValues?.filter((item) => item !== value);
      setValue("ips", ips);
    },
    [setValue, ipsValues],
  );

  return (
    <SettingCard
      title={t("setting.security.ip-block-rules.title")}
      description={t("setting.security.ip-block-rules.description")}
      {...getWithPlanCardProps({
        router,
        planId,
        feature: "hasBlockIPs",
        onClick: onSave,
        isLoading: isSubmitting,
        isDisabled: blockIpAddresses === ipsValues.join(","),
        labels: {
          partial: t("common.plan.flags.upgrade.partial"),
          all: t("common.plan.flags.upgrade.all"),
          upgrade: t("common.plan.flags.upgrade.action"),
          save: t("setting.security.ip-block-rules.action"),
          text: t("setting.security.ip-block-rules.text"),
        },
      })}
    >
      <>
        <Controller
          name="ip"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              hint={errors.ip?.message}
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value as string,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: t(
                  "setting.security.ip-block-rules.inputs.name.placeholder",
                ),
                hasError: !!errors.ip,
                onKeyDown: onHandleKeyDown,
                maxWidth: 400,
              }}
            />
          )}
        />
        {!!ipsValues?.length && (
          <TagsContainer>
            {ipsValues.map((item, index) => (
              <Label key={index} text={item} size="normal" isTranslucent>
                <IconButton
                  icon="close"
                  size="small"
                  variant="secondaryDark"
                  onClick={() => onDeleteIp(item)}
                />
              </Label>
            ))}
          </TagsContainer>
        )}
      </>
    </SettingCard>
  );
};

export default FlagsIpRulesCard;
