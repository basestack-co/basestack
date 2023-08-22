import React from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  Avatar,
  Text,
  Button,
  ButtonVariant,
} from "@basestack/design-system";
import { Container, ContentContainer, UserDetailsContainer } from "./styles";

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
            <Text muted>{session?.user.email || ""}</Text>
          </UserDetailsContainer>

          <Button
            variant={ButtonVariant.Secondary}
            onClick={() => console.log("click")}
            ml="auto"
            iconPlacement="right"
            icon="open_in_new"
          >
            Update
          </Button>
        </ContentContainer>
      </Container>
    </Card>
  );
};

export default AvatarCard;
