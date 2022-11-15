import React, { memo } from "react";
import { useTheme } from "styled-components";
import { Text, Avatar, Icon } from "../../atoms";
import {
  Container,
  Description,
  IconContainer,
  StyledText,
  TextContainer,
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
          userName={userName}
          alt={`${userName} profile picture`}
          size="small"
          mr={theme.spacing.s3}
        />
        <TextContainer>
          <Text fontWeight={500}>
            {userName} <Description as="span">{description}</Description>{" "}
            <StyledText type={type} as="span">
              {flagName}
            </StyledText>
          </Text>
          <Text muted>{`${date} - ${environment}`}</Text>
        </TextContainer>
      </Wrapper>
    </Container>
  );
};

export default memo(HistoryCard);
