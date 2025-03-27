import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Text, Avatar, Icon, Label } from "@basestack/design-system";
import {
  BottomContentContainer,
  Container,
  IconContainer,
  LabelsContainer,
  TextContainer,
  TitleContainer,
  Wrapper,
} from "./styles";
import { HistoryCardProps } from "./types";

const HistoryCard = ({
  userName,
  description,
  flagName,
  date,
  environments,
  type,
  hasPaddingTop = true,
  hasPaddingBottom = true,
  avatar,
  hasLeftLine = true,
}: HistoryCardProps) => {
  const theme = useTheme();

  const icon = {
    deleted: "delete",
    edited: "edit",
    created: "add",
    createdProject: "folder_open",
    toggledOn: "toggle_on",
    toggledOff: "toggle_off",
  };

  return (
    <Container
      hasPaddingTop={hasPaddingTop}
      hasPaddingBottom={hasPaddingBottom}
    >
      <Wrapper hasLeftLine={hasLeftLine}>
        <IconContainer>
          <Icon
            icon={type ? icon[type] : "help"}
            size="medium"
            color={theme.colors[theme.isDarkMode ? "gray400" : "gray600"]}
          />
        </IconContainer>
        <Avatar
          src={avatar}
          userName={userName}
          alt={`${userName} profile picture`}
          size="small"
          mr={theme.spacing.s3}
        />
        <TextContainer>
          <TitleContainer type={type}>
            <Text flexShrink={0} fontWeight={500}>
              {userName}
            </Text>
            &nbsp;
            <Text flexShrink={0} fontWeight={400}>
              {description}
            </Text>
            &nbsp;
            <Text fontWeight={500}>{flagName}</Text>
          </TitleContainer>
          <BottomContentContainer>
            {environments.length > 0 && (
              <LabelsContainer>
                {environments.map(({ name, enabled }, index) => (
                  <Label
                    key={index}
                    text={name}
                    variant={enabled ? "success" : "default"}
                  />
                ))}
              </LabelsContainer>
            )}
            <Text muted>{date}</Text>
          </BottomContentContainer>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export type { HistoryCardProps };

export default memo(HistoryCard);
