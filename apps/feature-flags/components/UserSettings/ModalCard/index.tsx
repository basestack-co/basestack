import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Store
import { useStore } from "store";
// Components
import { Card, Switch, Text } from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import { ContentContainer, TextContainer } from "./styles";

const ModalCard = () => {
  const { t } = useTranslation("profile");
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
          <Text size="large">{t("settings.card.modals.title")}</Text>
          <Text>{t("settings.card.modals.description")}</Text>
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
