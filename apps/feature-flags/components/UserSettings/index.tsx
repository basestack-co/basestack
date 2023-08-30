import React from "react";
import { useTheme } from "styled-components";
// Store
import { useStore } from "store";
// Form
import { z } from "zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Components
import { Text, Input } from "@basestack/design-system";
import SettingCard from "../SettingCard";
import ModalCard from "./ModalCard";
import AvatarCard from "./AvatarCard";
import ThemeCard from "./ThemeCard";
import { Container, List, ListItem } from "./styles";

export const FormSchema = z.object({
  numberOfFlags: z
    .number()
    .min(1, "Required field")
    .max(3, "Must be a value between 1 and 100"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;

const UserSettings = () => {
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
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Profile settings
      </Text>
      <List>
        <ListItem>
          <AvatarCard />
        </ListItem>
        <ListItem>
          <ModalCard />
        </ListItem>
        <ListItem>
          <ThemeCard />
        </ListItem>
        <ListItem>
          <SettingCard
            title="Flags per Page"
            description="Quantity of flags to display per page."
            button="Save"
            onClick={handleSubmit(onSubmit)}
          >
            <Controller
              name="numberOfFlags"
              control={control}
              defaultValue={numberOfFlagsPerPage}
              render={({ field }) => (
                <Input
                  value={field.value}
                  name={field.name}
                  placeholder={field.value.toString()}
                  type="number"
                  onChange={field.onChange}
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
          </SettingCard>
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettings;
