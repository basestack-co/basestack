import React, { useCallback, useState } from "react";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text, Switch, Skeleton } from "@basestack/design-system";
// Form
import { Controller } from "react-hook-form";
import { FlagFormInputs, EnvironmentInput } from "../types";
// Styles
import { Environments } from "../styles";
// Types
import { UseFormSetValue, FieldErrors, Control } from "react-hook-form";
// Locales
import useTranslation from "next-translate/useTranslation";

export interface Props {
  environments: EnvironmentInput[];
  setValue: UseFormSetValue<FlagFormInputs>;
  errors: FieldErrors<FlagFormInputs>;
  control: Control<FlagFormInputs, any>;
  isSubmitting: boolean;
}

const CoreTab = ({
  environments,
  setValue,
  errors,
  control,
  isSubmitting,
}: Props) => {
  const { t } = useTranslation("modals");
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
            title={t("flag.tab.core.input.name.title")}
            hint={errors.name?.message || t("flag.tab.core.input.name.hint")}
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value.replace(/ /g, "_"),
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: t("flag.tab.core.input.name.placeholder"),
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
            title={t("flag.tab.core.input.description.title")}
            label={`${textareaLength.length} / 120`}
            textarea
            hint={errors.description?.message}
            textareaProps={{
              name: field.name,
              value: field.value ?? "",
              onChange: onChangeTextarea,
              onBlur: field.onBlur,
              placeholder: t("flag.tab.core.input.description.placeholder"),
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
        {t("flag.tab.core.input.environments.title")}
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
