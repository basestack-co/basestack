import React from "react";
import { useStore } from "store";
import { useTheme } from "styled-components";
import { Text, Switch, Input } from "@basestack/design-system";
import SettingCard from "../SettingCard";
import AvatarCard from "./AvatarCard";
import { Container, List, ListItem, Row } from "./styles";

const UserSettings = () => {
  const theme = useTheme();
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );
  const setCloseModalsOnClickOutside = useStore(
    (state) => state.setCloseModalsOnClickOutside,
  );

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
          <SettingCard
            title="Modal behavior"
            description="Close modal when clicking outside main content"
            hasFooter={false}
          >
            <Row>
              <Text mr={theme.spacing.s2}>
                {closeModalsOnClickOutside ? "On" : "Off"}
              </Text>
              <Switch
                checked={closeModalsOnClickOutside}
                onChange={(event) => {
                  setCloseModalsOnClickOutside(event.target.checked);
                }}
              />
            </Row>
          </SettingCard>
        </ListItem>
        <ListItem>
          <SettingCard
            title="Number of flags"
            description="Number of flags to show per page"
            hasFooter={false}
          >
            <Input
              value="20"
              name="number-of-flags-input"
              placeholder="20"
              type="number"
              onChange={(event) => console.log("number of flags = ", event)}
              maxWidth={400}
            />
          </SettingCard>
        </ListItem>
      </List>
    </Container>
  );
};

export default UserSettings;
