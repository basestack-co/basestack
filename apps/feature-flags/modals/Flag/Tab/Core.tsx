import React, { useCallback, useState } from "react";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text, Switch } from "@basestack/design-system";
// Form
import { Controller } from "react-hook-form";
import { FlagFormInputs, EnvironmentInput } from "../types";
// Styles
import { Environments } from "../styles";
// Types
import { UseFormSetValue, FieldErrors, Control } from "react-hook-form";

export interface Props {
  environments: EnvironmentInput[];
  setValue: UseFormSetValue<FlagFormInputs>;
  errors: FieldErrors<FlagFormInputs>;
  control: Control<FlagFormInputs, any>;
  isSubmitting: boolean;
  isCreate?: boolean;
}

const CoreTab = ({
  environments,
  setValue,
  errors,
  control,
  isSubmitting,
  isCreate = true,
}: Props) => {
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
            title="Feature Key"
            hint={
              errors.name?.message ||
              "No numbers, spaces, or special characters"
            }
            inputProps={{
              type: "text",
              name: field.name,
              value: field.value.replace(/ /g, "_"),
              onChange: field.onChange,
              onBlur: field.onBlur,
              placeholder: "E.g. header_size",
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
            title="Description"
            label={`${textareaLength.length} / 120`}
            textarea
            hint={errors.description?.message}
            textareaProps={{
              name: field.name,
              value: field.value ?? "",
              onChange: onChangeTextarea,
              onBlur: field.onBlur,
              placeholder: "Flag description",
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
        Environment{isCreate ? "s" : ""}
      </Text>
      <Environments>
        {environments &&
          environments.map(({ id, name, enabled }) => {
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
    </>
  );
};

export default CoreTab;
