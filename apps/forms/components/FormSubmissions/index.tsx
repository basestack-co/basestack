import React from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Text } from "@basestack/design-system";
import { Container, List, ListItem } from "./styles";
import FormSubmission from "../FormSubmission";

const UserSettings = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Title
      </Text>
      <List>
        <ListItem>
          <FormSubmission
            data={[
              { title: "email", description: "flavioamaral@hotmail.com" },
              {
                title: "message",
                description: "This is a preview of the message",
              },
              { title: "age", description: "18" },
            ]}
            date="18-10-2025"
          />
        </ListItem>
        <ListItem>
          <FormSubmission
            data={[
              { title: "email", description: "flavioamaral@hotmail.com" },
              {
                title: "message",
                description: "This is a preview of the message",
              },
              { title: "age", description: "18" },
            ]}
            date="18-10-2025"
          />
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettings;
