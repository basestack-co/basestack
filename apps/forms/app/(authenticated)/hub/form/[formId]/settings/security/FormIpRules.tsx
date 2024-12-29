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
import { getWithPlanCardProps } from "../utils";
// Styles
import { TagsContainer } from "../styles";

export const FormSchema = z.object({
  ip: z.string().ip().optional().or(z.literal("")),
  ips: z.array(z.string()),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

export interface Props {
  blockIpAddresses?: string;
  planId: PlanTypeId;
}

const FormIpRulesCard = ({ blockIpAddresses = "", planId }: Props) => {
  const router = useRouter();
  const { formId } = useParams<{ formId: string }>();
  const t = useTranslations();
  const trpcUtils = api.useUtils();
  const updateForm = api.form.update.useMutation();

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
    updateForm.mutate(
      {
        formId,
        blockIpAddresses: ipsValues.join(","),
        feature: "hasBlockIPs",
      },
      {
        onSuccess: (result) => {
          const cache = trpcUtils.form.byId.getData({
            formId: result.form.id,
          });

          if (cache) {
            trpcUtils.form.byId.setData(
              { formId: result.form.id },
              {
                ...cache,
                blockIpAddresses: result.form.blockIpAddresses,
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
  }, [ipsValues, updateForm, formId, trpcUtils, t]);

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
        t,
        router,
        planId,
        feature: "hasBlockIPs",
        i18nKey: "setting.security.ip-block-rules.action",
        i18nHintKey: "setting.security.ip-block-rules.text",
        onClick: onSave,
        isLoading: isSubmitting,
        isDisabled: blockIpAddresses === ipsValues.join(","),
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

export default FormIpRulesCard;
