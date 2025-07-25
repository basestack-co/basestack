import { InputGroup, Skeleton, Switch, Text } from "@basestack/design-system";
// Locales
import { type NamespaceKeys, useTranslations } from "next-intl";
import type React from "react";
import { useCallback, useState } from "react";
// Form
import {
  type Control,
  Controller,
  type FieldErrors,
  type UseFormSetValue,
} from "react-hook-form";
// Components
import { useTheme } from "styled-components";
// Styles
import { Environments } from "../styles";
import type { EnvironmentInput, FlagFormInputs } from "../types";

export interface Props {
  environments: EnvironmentInput[];
  setValue: UseFormSetValue<FlagFormInputs>;
  errors: FieldErrors<FlagFormInputs>;
  control: Control<FlagFormInputs>;
  isSubmitting: boolean;
}

const CoreTab = ({
  environments,
  setValue,
  errors,
  control,
  isSubmitting,
}: Props) => {
  const t = useTranslations();
  const theme = useTheme();
  const [textareaLength, setTextareaLength] = useState("");

  const onChangeEnvironmentSwitch = useCallback(
    (id: string, enabled: boolean) => {
      const updated = environments.map((item: EnvironmentInput) =>
        item.id === id ? { ...item, enabled } : item,
      );

      setValue("environments", updated);
    },
    [environments, setValue],
  );

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 120) {
        setTextareaLength(text);
      }

      setValue("description", text);
    },
    [textareaLength, setValue],
  );

  return (
    <>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            title={t("modal.flag.tab.core.input.name.title")}
            hint={
              errors.name?.message
                ? t(errors.name?.message! as NamespaceKeys<string, "modal">)
                : t("modal.flag.tab.core.input.name.hint")
            }
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value.toLowerCase().replace(/ /g, "_"),
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("modal.flag.tab.core.input.name.placeholder"),
              hasError: !!errors.name,
              isDisabled: isSubmitting,
            }}
            mb={theme.spacing.s6}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputGroup
            title={t("modal.flag.tab.core.input.description.title")}
            label={`${textareaLength.length} / 120`}
            textarea
            hint={
              errors.description?.message
                ? t(
                    errors.description?.message! as NamespaceKeys<
                      string,
                      "modal"
                    >,
                  )
                : ""
            }
            textareaProps={{
              name: field.name,
              value: field.value ?? "",
              onChange: onChangeTextarea,
              onBlur: field.onBlur,
              placeholder: t(
                "modal.flag.tab.core.input.description.placeholder",
              ),
              maxlength: "120",
              hasError: !!errors.description,
              isDisabled: isSubmitting,
            }}
            mb={theme.spacing.s6}
          />
        )}
      />
      <Text
        fontWeight={500}
        mb={theme.spacing.s2}
        data-testid="input-group-title"
        size="small"
      >
        {t("modal.flag.tab.core.input.environments.title")}
      </Text>
      {!environments ? (
        <Skeleton
          displayInline
          items={[
            { h: 24, w: "20%", mr: 10 },
            { h: 24, w: "25%", mr: 10 },
            { h: 24, w: "20%" },
          ]}
          hasShadow={false}
          padding="8px 0"
        />
      ) : (
        <Environments>
          {environments.map(({ id, name, enabled }) => {
            return (
              <Switch
                key={`create-flag-env-${id}`}
                py={theme.spacing.s2}
                mr={theme.spacing.s5}
                text={name}
                checked={enabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeEnvironmentSwitch(id, event.target.checked)
                }
              />
            );
          })}
        </Environments>
      )}
    </>
  );
};

export default CoreTab;
