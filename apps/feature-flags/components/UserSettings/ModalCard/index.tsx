import React from "react";
import { useStore } from "store";
import { Card, Switch, Text } from "@basestack/design-system";
import { useTheme } from "styled-components";
import { ContentContainer, TextContainer } from "./styles";

const ModalCard = () => {
  const theme = useTheme();
  const closeModalsOnClickOutside = useStore(
    (state) => state.closeModalsOnClickOutside,
  );
  const setCloseModalsOnClickOutside = useStore(
    (state) => state.setCloseModalsOnClickOutside,
  );

  return (
    <Card p={theme.spacing.s5}>
      <ContentContainer>
        <TextContainer>
          <Text size="large">Modal behavior</Text>
          <Text>Close modal when clicking outside main content</Text>
        </TextContainer>
        <Switch
          ml={theme.spacing.s5}
          checked={closeModalsOnClickOutside}
          onChange={(event) => {
            setCloseModalsOnClickOutside(event.target.checked);
          }}
        />
      </ContentContainer>
    </Card>
  );
};

export default ModalCard;
