import React from "react";
import { useTheme } from "styled-components";
// Components
import { Text, Icon, Checkbox, Avatar, Label } from "@basestack/design-system";
// Styles
import {
  Box,
  HeaderButton,
  HeaderCell,
  HeaderGrid,
  HeaderRight,
} from "./styles";
import { FormSubmissionHeaderProps } from "./types";

const Header = ({
  isOpen,
  data,
  date,
  onClick,
  checkbox,
}: FormSubmissionHeaderProps) => {
  const theme = useTheme();

  return (
    <Box display="flex">
      <HeaderCell>
        <Checkbox {...checkbox} />
      </HeaderCell>
      <HeaderButton onClick={onClick}>
        <HeaderGrid>
          {data.map((item, index) => (
            <HeaderCell key={index}>
              {item.description.includes("@") && (
                <Avatar
                  userName={item.description.substring(0, 2)}
                  size="xSmall"
                  alt=""
                  mr={theme.spacing.s2}
                />
              )}
              <Box minWidth={0}>
                <Text size="xSmall" muted>
                  {item.title}
                </Text>
                <Text fontWeight={400} lineTruncate>
                  {item.description}
                </Text>
              </Box>
            </HeaderCell>
          ))}
        </HeaderGrid>
        <HeaderRight>
          <Label text="New" variant="info" isTranslucent />
          <Box minWidth={0}>
            <Text fontWeight={400} muted lineTruncate>
              {date}
            </Text>
          </Box>
          <Icon icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"} muted />
        </HeaderRight>
      </HeaderButton>
    </Box>
  );
};

export default Header;
