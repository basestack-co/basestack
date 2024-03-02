import React, { useState } from "react";
import { useTheme } from "styled-components";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
import { Input, Text, Button, ButtonVariant } from "@basestack/design-system";
import {
  Container,
  LeftContent,
  List,
  ListItem,
  RightContent,
  ToolbarContainer,
} from "./styles";
import FormSubmission from "../FormSubmission";

const FormSubmissions = () => {
  const { t } = useTranslation("profile");
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <Container>
      <Text size="xLarge">Contact</Text>
      <ToolbarContainer>
        <LeftContent>
          <Input
            testId="search-input"
            size="small"
            width="100%"
            isDarker
            icon="search"
            iconPlacement="left"
            placeholder="Search submissions"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            name="search"
            value={searchValue}
          />
        </LeftContent>
        <RightContent>
          <Button
            icon="filter_list"
            iconPlacement="left"
            variant={ButtonVariant.Tertiary}
            onClick={() => console.log("")}
          >
            Filters
          </Button>
          <Button
            icon="swap_vert"
            iconPlacement="left"
            variant={ButtonVariant.Tertiary}
            onClick={() => console.log("")}
          >
            Sort
          </Button>
          <Button
            icon="download"
            iconPlacement="left"
            variant={ButtonVariant.Tertiary}
            onClick={() => console.log("")}
          >
            Export
          </Button>
        </RightContent>
      </ToolbarContainer>
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
              { title: "email", description: "vitoramaral@hotmail.com" },
              {
                title: "message",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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

export default FormSubmissions;
