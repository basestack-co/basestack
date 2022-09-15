import React, { useCallback, useState } from "react";
// Components
import { useTheme } from "styled-components";
import { InputGroup, Text, Switch } from "@basestack/design-system";
// Styles
import { Environments } from "../styles";
// Types
import { Form } from "types/flags";

export interface Props {
  form: Form;
}

const CoreTab = ({ form }: Props) => {
  const theme = useTheme();
  const [textareaLength, setTextareaLength] = useState("");

  const onChangeEnvironmentSwitch = useCallback(
    (id: string, enabled: boolean) => {
      const updated = form.values.environments.map((item) =>
        item.id === id ? { ...item, enabled } : item
      );

      form.setFieldValue("environments", updated);
    },
    [form.values.environments]
  );

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 120) {
        setTextareaLength(text);
      }

      form.setFieldValue("description", text);
    },
    [textareaLength]
  );

  return (
    <>
      <InputGroup
        title="Feature Key"
        hint={form.errors.name || "No numbers, spaces, or special characters"}
        inputProps={{
          name: "name",
          value: form.values.name.replace(/ /g, "_"),
          onChange: form.handleChange,
          placeholder: "E.g. header_size",
          hasError: form.touched.name && !!form.errors.name,
          isDisabled: form.isSubmitting,
        }}
        mb={theme.spacing.s6}
      />
      <InputGroup
        title="Description"
        label={`${textareaLength.length} / 120`}
        textarea
        textareaProps={{
          name: "description",
          value: form.values.description,
          onChange: onChangeTextarea,
          placeholder: "Flag description",
          maxlength: "120",
          hasError: form.touched.description && !!form.errors.description,
          isDisabled: form.isSubmitting,
        }}
        mb={theme.spacing.s6}
      />
      <Text
        fontWeight={500}
        mb={theme.spacing.s2}
        data-testid="input-group-title"
        size="small"
      >
        Environments
      </Text>
      <Environments>
        {form.values.environments.map(({ id, name, enabled }) => {
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
