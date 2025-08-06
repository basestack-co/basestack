// Components
import { IconButton, InputGroup, Label } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";
// Utils
import { zodResolver } from "@hookform/resolvers/zod";
// Router
import { useParams } from "next/navigation";
// Locales
import { useTranslations } from "next-intl";
import type React from "react";
import { useCallback, useEffect } from "react";
// Form
import { Controller, useForm } from "react-hook-form";
// Toast
import { toast } from "sonner";
// Server
import { api } from "utils/trpc/react";
import { z } from "zod";
// Styles
import { TagsContainer } from "../../styles";

export const FormSchema = z.object({
  ip: z.string().ip().optional().or(z.literal("")),
  ips: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  blockIpAddresses?: string;
}

const FlagsIpRulesCard = ({ blockIpAddresses = "" }: Props) => {
  const { projectId } = useParams<{ projectId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateProject = api.projects.update.useMutation();

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
          const cache = trpcUtils.projects.byId.getData({
            projectId: result.project.id,
          });

          if (cache) {
            trpcUtils.projects.byId.setData(
              { projectId: result.project.id },
              {
                ...cache,
                blockIpAddresses: result.project.blockIpAddresses,
              }
            );
          }

          toast.success(t("setting.security.ip-block-rules.toast.success"));
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
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
    [ipValue, setValue, ipsValues, errors, setError]
  );

  const onDeleteIp = useCallback(
    (value: string) => {
      const ips = ipsValues?.filter((item) => item !== value);
      setValue("ips", ips);
    },
    [setValue, ipsValues]
  );

  return (
    <SettingCard
      title={t("setting.security.ip-block-rules.title")}
      description={t("setting.security.ip-block-rules.description")}
      text={t("setting.security.ip-block-rules.text")}
      button={t("setting.security.ip-block-rules.action")}
      onClick={onSave}
      isLoading={isSubmitting}
      isDisabled={blockIpAddresses === ipsValues.join(",")}
    >
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
                "setting.security.ip-block-rules.inputs.name.placeholder"
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
    </SettingCard>
  );
};

export default FlagsIpRulesCard;
