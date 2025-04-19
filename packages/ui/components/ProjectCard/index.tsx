import React, { memo } from "react";
import { useTheme } from "styled-components";
import {
  Text,
  Card,
  Avatar,
  HorizontalRule,
  Icon,
} from "@basestack/design-system";
import { Button, Box, Row } from "./styles";

interface ProjectCardProps {
  text: string;
  onClick: () => void;
  flags: number;
}

const ProjectCard = ({ onClick, text, flags = 0 }: ProjectCardProps) => {
  const theme = useTheme();
  return (
    <Button onClick={onClick}>
      <Card height="100%" width="100%" hasHoverAnimation>
        <Box mb="auto" p={theme.spacing.s5}>
          <Avatar
            size="xSmall"
            userName={text}
            alt={`${text} project`}
            round={false}
          />
          <Text size="small" textAlign="left" mt={theme.spacing.s3}>
            {text}
          </Text>
        </Box>
        <HorizontalRule />
        <Box p={`${theme.spacing.s3} ${theme.spacing.s5}`}>
          <Row>
            <Icon icon="flag" size="small" />
            <Text size="small" textAlign="left" ml={theme.spacing.s1}>
              {flags}
            </Text>
          </Row>
        </Box>
      </Card>
    </Button>
  );
};

export type { ProjectCardProps };

export default memo(ProjectCard);
