import React from "react";
import { useTheme } from "styled-components";
import { Text, IconBox } from "@basestack/design-system";
import { Card } from "../../styles";
import { ContentContainer, TextContainer, Button } from "./styles";

export interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const CardComp = ({
  title,
  description,
  icon = "help",
  isActive,
  onClick,
  isDisabled = false,
}: CardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();

  const iconBoxProps = isDarkMode
    ? {
        iconColor: colors.gray300,
        outlinedBg: colors.gray800,
        gradient: [
          colors.gray800,
          colors.gray600,
          colors.gray500,
          colors.gray800,
        ],
      }
    : {};

  const activeBg = isDarkMode ? colors.gray800 : colors.white;
  const bg = isDarkMode ? colors.gray900 : colors.gray50;

  return (
    <Button onClick={onClick} disabled={isDisabled}>
      <Card bg={isActive ? activeBg : bg} transitionBg>
        <ContentContainer>
          <TextContainer>
            <IconBox
              backgroundColor={isActive ? activeBg : bg}
              size="small"
              icon={icon}
              mr={spacing.s3}
              {...iconBoxProps}
            />
            <Text size="large">{title}</Text>
          </TextContainer>

          <Text size="medium" fontWeight={400} muted>
            {description}
          </Text>
        </ContentContainer>
      </Card>
    </Button>
  );
};

export default CardComp;
