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
import { Container, List, ListItem } from "./styles";

export const FormSchema = z.object({
  numberOfFlags: z.string().min(1, "Required field").max(3, "Must be 999 less"),
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
          <SettingCard
            title="Number of flags"
            description="Number of flags to show per page"
            button="Save"
            onClick={handleSubmit(onSubmit)}
          >
            <Controller
              name="numberOfFlags"
              control={control}
              defaultValue={numberOfFlagsPerPage.toString()}
              render={({ field }) => (
                <Input
                  value={field.value}
                  name={field.name}
                  placeholder={field.value}
                  type="number"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  maxWidth={400}
                  hasError={!!errors.numberOfFlags}
                  min="1"
                  max="999"
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
