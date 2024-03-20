import React from "react";
import { useTheme } from "styled-components";
import {
  Avatar,
  Card,
  HorizontalRule,
  Icon,
  Text,
} from "@basestack/design-system";
import { Box, CardButton, ListItem } from "./styles";

export interface FormCardProps {
  onClick: () => void;
  text: string;
  spam: number;
  submissions: {
    unread: number;
    read: number;
  };
}

interface DetailProps {
  value: number;
  icon: string;
  mr?: string;
}

const Detail = ({ value, icon, mr }: DetailProps) => {
  const theme = useTheme();

  return (
    <Box mr={mr} display="flex" alignItems="center">
      <Icon icon={icon} size="small" />
      <Text size="small" textAlign="left" ml={theme.spacing.s1}>
        {value >= 99 ? "+99" : value}
      </Text>
    </Box>
  );
};

const FormCard = ({ onClick, text, spam, submissions }: FormCardProps) => {
  const theme = useTheme();

  return (
    <ListItem>
      <CardButton onClick={onClick}>
        <Card height="100%" width="100%" hasHoverAnimation>
          <Box mb="auto" p={theme.spacing.s5}>
            <Avatar
              size="xSmall"
              userName={text}
              alt={`${text} form`}
              round={false}
            />
            <Text size="small" textAlign="left" mt={theme.spacing.s3}>
              {text}
            </Text>
          </Box>
          <HorizontalRule />
          <Box
            display="flex"
            alignItems="center"
            p={`${theme.spacing.s3} ${theme.spacing.s5}`}
          >
            {!!submissions.unread && (
              <Detail
                icon="mark_email_unread"
                value={submissions.unread}
                mr={theme.spacing.s4}
              />
            )}
            {!!submissions.read && (
              <Detail
                icon="mark_email_read"
                value={submissions.read}
                mr={theme.spacing.s4}
              />
            )}
            {!submissions.read && !submissions.unread && (
              <Detail icon="mail" value={0} mr={theme.spacing.s4} />
            )}
            {!!spam && <Detail icon="report" value={spam} />}
          </Box>
        </Card>
      </CardButton>
    </ListItem>
  );
};

export default FormCard;
