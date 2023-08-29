import React from "react";
import { useSession } from "next-auth/react";
import { Card, Avatar, Text, HorizontalRule } from "@basestack/design-system";
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
        <Text muted>
          Please edit the user details through your service provider to update
          the information.
        </Text>
      </Footer>
    </Card>
  );
};

export default AvatarCard;
