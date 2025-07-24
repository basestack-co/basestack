import {
  Avatar,
  Card,
  HorizontalRule,
  Icon,
  Label,
  PopupMenu,
  PopupMenuProps,
  Skeleton,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
import React, { memo } from "react";
import { useTheme } from "styled-components";
import {
  AvatarListItem,
  Avatars,
  Body,
  Button,
  Container,
  DetailContainer,
  Footer,
  PopupMenuWrapper,
  TooltipContainer,
} from "./styles";

interface ProjectCardProps {
  text: string;
  onClick: () => void;
  avatars?: Array<{ name: string | null; image: string | null }>;
  menuItems?: PopupMenuProps["items"];
  label?: {
    text: string;
    tooltip?: string;
  };
  count?: Array<{
    icon: string;
    value: number;
  }>;
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

interface DetailProps {
  value: number;
  icon: string;
}

const Detail = ({ value, icon }: DetailProps) => {
  const theme = useTheme();

  return (
    <DetailContainer>
      <Icon icon={icon} size="small" />
      <Text size="small" textAlign="left" ml={theme.spacing.s1}>
        {value >= 99 ? "+99" : value}
      </Text>
    </DetailContainer>
  );
};

const NUMBER_OF_AVATARS = 5;

const ProjectCard = ({
  onClick,
  text,
  avatars,
  menuItems,
  label,
  count,
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

            {count &&
              count.map((item, index) => (
                <Detail key={index} icon={item.icon} value={item.value} />
              ))}

            {label && (
              <>
                {!!label?.tooltip ? (
                  <TooltipContainer>
                    <Tooltip placement="top">
                      <TooltipTrigger>
                        <Label text="External" size="small" variant="light" />
                      </TooltipTrigger>
                      <TooltipContent>{label.tooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipContainer>
                ) : (
                  <Label
                    text={label.text}
                    size="small"
                    variant="light"
                    ml="auto"
                  />
                )}
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
