import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Text, Avatar, Icon } from "../../atoms";
import {
  Container,
  IconContainer,
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
  environment,
  type,
  hasPaddingTop = true,
  hasPaddingBottom = true,
  avatar,
}: HistoryCardProps) => {
  const theme = useTheme();

  const icon = {
    deleted: "delete",
    edited: "edit",
    created: "add",
    toggledOn: "toggle_on",
    toggledOff: "toggle_off",
  };

  return (
    <Container
      hasPaddingTop={hasPaddingTop}
      hasPaddingBottom={hasPaddingBottom}
    >
      <Wrapper type={type}>
        <IconContainer>
          <Icon
            icon={type ? icon[type] : "help"}
            size="medium"
            color={theme.colors.gray600}
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
            <Text fontWeight={500} lineTruncate>
              {flagName}
            </Text>
          </TitleContainer>
          <Text muted>{`${date} - ${environment}`}</Text>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default memo(HistoryCard);
