import React from "react";
import { rem } from "polished";
import {
  Flex,
  HorizontalRule,
  IconButton,
  Text,
  Box,
} from "@basestack/design-system";
import { useTheme } from "styled-components";

export interface OutlinedCardProps {
  onClick?: () => void;
  icon?: string;
  title: string;
  text: string;
  mb?: string | number;
  hasHorizontalRule?: boolean;
}

const OutlinedCard = ({
  onClick,
  title,
  text,
  icon = "content_copy",
  mb,
  hasHorizontalRule = true,
}: OutlinedCardProps) => {
  const { spacing } = useTheme();

  return (
    <Flex flexDirection="column">
      <Text as="p" muted fontWeight={400} lineHeight={rem("24px")} lineTruncate>
        {title}
      </Text>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        pr={onClick ? rem("40px") : 0}
      >
        <Text size="medium" fontWeight={400} lineTruncate>
          {text}
        </Text>
        {onClick && (
          <Box position="absolute" right={0}>
            <IconButton size="medium" onClick={onClick} icon={icon} />
          </Box>
        )}
      </Box>
      {hasHorizontalRule && (
        <Box
          pt={spacing.s3}
          pb={mb || typeof mb === "number" ? mb : spacing.s3}
        >
          <HorizontalRule isDarker />
        </Box>
      )}
    </Flex>
  );
};

export default OutlinedCard;
