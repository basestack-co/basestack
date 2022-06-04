import React, { useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Text, SettingCard } from "design-system";
import {
  CardList,
  CardListItem,
  List,
  ListItem,
  SettingsContainer,
  StyledButton,
} from "./styles";
import { Container } from "../styles";

const buttons = ["General", "Environments", "Members", "Api Keys", "Billing"];

const Settings = () => {
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState({
    text: "general",
    index: 0,
  });

  const renderButton = useMemo(() => {
    return buttons.map((button, index) => (
      <ListItem key={index.toString()}>
        <StyledButton
          isActive={activeButton.text === button.toLowerCase()}
          onClick={() => setActiveButton({ text: button.toLowerCase(), index })}
          variant="neutral"
          fontWeight={400}
          fullWidth
        >
          {button}
        </StyledButton>
      </ListItem>
    ));
  }, [activeButton]);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Settings
      </Text>
      <SettingsContainer>
        <List top={activeButton.index * 100}>{renderButton}</List>
        <CardList>
          <CardListItem>
            <SettingCard
              title="Team name"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              button="Save"
              onClick={() => console.log("save")}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              input={{
                onChange: () => console.log("change"),
                placeholder: "Team name",
              }}
            />
          </CardListItem>
          <CardListItem>
            <SettingCard
              title="Project name"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              button="Save"
              onClick={() => console.log("save")}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              input={{
                onChange: () => console.log("change"),
                placeholder: "Project name",
              }}
            />
          </CardListItem>
        </CardList>
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
