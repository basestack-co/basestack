import React, { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import { InputGroup } from "@basestack/design-system";
// Form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import Select from "react-select";
// Types
import { FormInputs, FormSchema } from "./types";

export interface Props {
  isCreate?: boolean;
  options?: Array<{ value: string; label: string }>;
}

const useEnvironmentForm = ({ isCreate = false, options = [] }: Props) => {
  const theme = useTheme();
  const [textareaLength, setTextareaLength] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormInputs>({
    // @ts-ignore
    resolver: zodResolver(FormSchema), // TODO: fix this, broken after the 3.0.0 release
    mode: "onChange",
  });

  const onChangeTextarea = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      if (textareaLength.length < 250) {
        setTextareaLength(text);
      }

      setValue("description", text);
    },
    [textareaLength, setValue]
  );

  const onRenderForm = () => {
    return (
      <>
        {isCreate && (
          <>
            <Controller
              name="environmentId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  ref={field.ref}
                  placeholder="Select environment"
                  options={options}
                  value={
                    (options &&
                      options.find((option) => option.value === field.value)) ||
                    []
                  }
                  onChange={(val) => field.onChange((val && val.value) || "")}
                  isDisabled={!options.length}
                  isLoading={!options.length}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      ...(state.isFocused
                        ? {
                            outline: `2px solid ${theme.colors.black}`,
                          }
                        : {}),
                      backgroundColor: theme.colors.gray50,
                      border: "none",
                    }),
                  }}
                  isClearable
                />
              )}
            />
            <br />
          </>
        )}

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputGroup
              title="Environment name"
              hint={errors.name?.message}
              inputProps={{
                type: "text",
                name: field.name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                placeholder: "E.g. development",
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
              label={`${textareaLength.length} / 250`}
              textarea
              textareaProps={{
                name: field.name,
                value: field.value ?? "",
                onChange: onChangeTextarea,
                onBlur: field.onBlur,
                placeholder: "Environment description",
                maxlength: "250",
                hasError: !!errors.description,
                isDisabled: isSubmitting,
              }}
            />
          )}
        />
      </>
    );
  };

  return { handleSubmit, onRenderForm, isSubmitting, reset, setValue } as const;
};

export default useEnvironmentForm;
