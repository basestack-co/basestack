import React from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  Avatar,
  Text,
  Button,
  ButtonVariant,
  HorizontalRule,
} from "@basestack/design-system";
import {
  Container,
  ContentContainer,
  Footer,
  UserDetailsContainer,
} from "./styles";

const AvatarCard = () => {
  const { data: session } = useSession();

  return (
    <Card>
      <Container>
        <ContentContainer>
          <Avatar
            size="large"
            userName={session?.user.name || "User Name"}
            src={session?.user.image || ""}
            alt="user image"
          />
          <UserDetailsContainer>
            <Text size="large">{session?.user.name || "User Name"}</Text>
            <Text>{session?.user.email || ""}</Text>
          </UserDetailsContainer>
        </ContentContainer>
      </Container>
      <HorizontalRule />
      <Footer>
        <Button
          variant={ButtonVariant.Secondary}
          onClick={() => console.log("click")}
          ml="auto"
          iconPlacement="right"
          icon="open_in_new"
        >
          Update
        </Button>
      </Footer>
    </Card>
  );
};

export default AvatarCard;
