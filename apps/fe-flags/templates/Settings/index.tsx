import React, { useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Text } from "design-system";
import { List, ListItem, SettingsContainer, StyledButton } from "./styles";
import { Container } from "../styles";

import General from "./General";
import Environments from "./Environments";
import Members from "./Members";
import ApiKeys from "./ApiKeys";

enum ButtonsEnum {
  GENERAL = "general",
  ENVIRONMENTS = "environments",
  MEMBERS = "members",
  API_KEYS = "api keys",
}

const buttons = ["General", "Environments", "Members", "Api Keys"];

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

  const renderContent = useMemo(() => {
    switch (activeButton.text) {
      case ButtonsEnum.GENERAL:
        return <General />;
      case ButtonsEnum.ENVIRONMENTS:
        return <Environments />;
      case ButtonsEnum.MEMBERS:
        return <Members />;
      case ButtonsEnum.API_KEYS:
        return <ApiKeys />;
    }
  }, [activeButton]);

  return (
    <Container>
      <Text size="xLarge" mb={theme.spacing.s5}>
        Settings
      </Text>
      <SettingsContainer>
        <List top={activeButton.index * 100}>{renderButton}</List>
        {renderContent}
      </SettingsContainer>
    </Container>
  );
};

export default Settings;
