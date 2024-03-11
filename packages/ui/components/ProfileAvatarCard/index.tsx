import React from "react";
// Components
import { Card, Avatar, Text, HorizontalRule } from "@basestack/design-system";
// Styles
import {
  Container,
  ContentContainer,
  Footer,
  UserDetailsContainer,
} from "./styles";

export interface ProfileAvatarCardProps {
  name: string;
  image: string;
  email: string;
  imageAlt?: string;
  description?: string;
}

const ProfileAvatarCard = ({
  name,
  email,
  image,
  imageAlt = "User profile picture",
  description,
}: ProfileAvatarCardProps) => {
  return (
    <Card>
      <Container>
        <ContentContainer>
          <Avatar size="large" userName={name} src={image} alt={imageAlt} />
          <UserDetailsContainer>
            <Text size="large">{name}</Text>
            <Text>{email}</Text>
          </UserDetailsContainer>
        </ContentContainer>
      </Container>
      <HorizontalRule />
      {description && (
        <Footer>
          <Text muted>{description}</Text>
        </Footer>
      )}
    </Card>
  );
};

export default ProfileAvatarCard;
