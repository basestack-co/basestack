import React from "react";
import { useTheme } from "styled-components";
// Store
import { useStore } from "store";
// Form
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Input, Text } from "@basestack/design-system";
// UI
import { SettingCard } from "@basestack/ui";

export const FormSchema = z.object({
  numberOfFlags: z
    .number()
    .min(1, "settings.card.flags.input.number-of-flags.error.min")
    .max(100, "settings.card.flags.input.number-of-flags.error.max"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const ModalCard = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const numberOfFlagsPerPage = useStore((state) => state.numberOfFlagsPerPage);
  const setNumberOfFlagsPerPage = useStore(
    (state) => state.setNumberOfFlagsPerPage,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setNumberOfFlagsPerPage(+data.numberOfFlags);
  };

  return (
    <SettingCard
      title={t("settings.card.flags.title")}
      description={t("settings.card.flags.description")}
      button={t("settings.card.flags.action")}
      onClick={handleSubmit(onSubmit)}
    >
      <>
        <Controller
          name="numberOfFlags"
          control={control}
          defaultValue={numberOfFlagsPerPage}
          render={({ field }) => (
            <Input
              value={field.value === 0 ? "" : field.value}
              name={field.name}
              placeholder={field.value === 0 ? "" : field.value.toString()}
              type="number"
              onChange={(e) => field.onChange(+e.target.value)}
              onBlur={(e) => {
                const inputValue = +e.target.value;
                if (inputValue <= 0) {
                  e.currentTarget.value = "1";
                  field.onChange(1);
                }
                field.onBlur();
              }}
              maxWidth={400}
              hasError={!!errors.numberOfFlags}
              onInput={(e) => {
                const inputValue = +e.target.value;
                if (inputValue > 100) {
                  e.currentTarget.value = "100";
                  field.onChange(100);
                }
              }}
              min={1}
              max={100}
            />
          )}
        />
        {!!errors?.numberOfFlags?.message && (
          <Text mt={theme.spacing.s1} color={theme.inputGroup.hint.error.color}>
            {t(errors.numberOfFlags.message)}
          </Text>
        )}
      </>
    </SettingCard>
  );
};

export default ModalCard;
