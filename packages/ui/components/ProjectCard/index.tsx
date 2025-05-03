import React, { memo } from "react";
import { useTheme } from "styled-components";
import {
  Text,
  Card,
  Avatar,
  HorizontalRule,
  Icon,
  Skeleton,
  PopupMenu,
  PopupMenuProps,
} from "@basestack/design-system";
import {
  Button,
  Body,
  Footer,
  Avatars,
  AvatarListItem,
  PopupMenuWrapper,
  Container,
} from "./styles";

interface ProjectCardProps {
  text: string;
  onClick: () => void;
  flags?: number;
  avatars?: Array<{ name: string | null; image: string | null }>;
  menuItems?: PopupMenuProps["items"];
}

const ProjectCardLoading = () => (
  <Skeleton
    numberOfItems={1}
    items={[
      { h: 28, w: 28, mb: 12 },
      { h: 22, w: "50%", mb: 32 },
      { h: 22, w: 28 },
    ]}
    padding="20px 20px 12px 20px"
  />
);

const NUMBER_OF_AVATARS = 5;

const ProjectCard = ({
  onClick,
  text,
  flags,
  avatars,
  menuItems,
}: ProjectCardProps) => {
  const theme = useTheme();
  const isButton = typeof onClick === "function";

  return (
    <Container>
      {menuItems && (
        <PopupMenuWrapper>
          <PopupMenu items={menuItems} />
        </PopupMenuWrapper>
      )}
      <Button
        onClick={onClick}
        as={isButton ? "button" : "div"}
        isButton={isButton}
      >
        <Card height="100%" width="100%" hasHoverAnimation={isButton}>
          <Body>
            <Avatar
              size="xSmall"
              userName={text}
              alt={`${text} project`}
              round={false}
            />
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Body>
          <HorizontalRule />
          <Footer>
            {avatars && avatars.length > 0 && (
              <Avatars>
                {avatars.slice(0, NUMBER_OF_AVATARS).map((avatar, index) => (
                  <AvatarListItem key={index} index={index}>
                    <Avatar
                      size="xSmall"
                      userName={avatar.name || ""}
                      alt={avatar.name || ""}
                      src={avatar.image || ""}
                      round
                    />
                  </AvatarListItem>
                ))}

                {avatars.length > NUMBER_OF_AVATARS && (
                  <Text
                    size="small"
                    textAlign="left"
                    ml={theme.spacing.s1}
                    muted
                  >
                    +{avatars.length - NUMBER_OF_AVATARS}
                  </Text>
                )}
              </Avatars>
            )}

            {typeof flags === "number" && (
              <>
                <Icon icon="flag" size="small" />
                <Text size="small" textAlign="left" ml={theme.spacing.s1}>
                  {flags}
                </Text>
              </>
            )}
          </Footer>
        </Card>
      </Button>
    </Container>
  );
};

export { type ProjectCardProps, ProjectCardLoading };

export default memo(ProjectCard);
