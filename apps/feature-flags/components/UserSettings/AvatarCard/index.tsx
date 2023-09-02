import React from "react";
// Auth
import { useSession } from "next-auth/react";
// Components
import { Card, Avatar, Text, HorizontalRule } from "@basestack/design-system";
// Locales
import useTranslation from "next-translate/useTranslation";
// Styles
import {
  Container,
  ContentContainer,
  Footer,
  UserDetailsContainer,
} from "./styles";

const AvatarCard = () => {
  const { t } = useTranslation("profile");
  const { data: session } = useSession();

  return (
    <Card>
      <Container>
        <ContentContainer>
          <Avatar
            size="large"
            userName={session?.user.name || t("settings.card.avatar.title")}
            src={session?.user.image || ""}
            alt={t("settings.card.avatar.alt")}
          />
          <UserDetailsContainer>
            <Text size="large">
              {session?.user.name || t("settings.card.avatar.title")}
            </Text>
            <Text>{session?.user.email || ""}</Text>
          </UserDetailsContainer>
        </ContentContainer>
      </Container>
      <HorizontalRule />
      <Footer>
        <Text muted>{t("settings.card.avatar.description")}</Text>
      </Footer>
    </Card>
  );
};

export default AvatarCard;
