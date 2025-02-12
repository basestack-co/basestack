import React from "react";
import { useTheme } from "styled-components";
// Components
import { Icon, Text } from "@basestack/design-system";
import { CardContainer, TitleContainer } from "./styles";

export interface SlideCardProps {
  title: string;
  icon: string;
  text: string;
  isActive?: boolean;
  onClick: () => void;
  /**
   * Time for the underline animation in ms
   * */
  animationTime?: number;
}

const SlideCard = ({
  title,
  text,
  icon,
  isActive = false,
  onClick,
  animationTime = 10000,
}: SlideCardProps) => {
  const { isDarkMode, colors, spacing } = useTheme();

  const activeIconColor = isDarkMode ? colors.blue300 : colors.primary;
  const iconColor = isDarkMode ? colors.gray300 : colors.black;

  return (
    <CardContainer
      animationTime={animationTime}
      onClick={onClick}
      isActive={isActive}
    >
      <TitleContainer>
        <Icon
          icon={icon}
          size="medium"
          color={isActive ? activeIconColor : iconColor}
        />
        <Text ml={spacing.s3} size="large">
          {title}
        </Text>
      </TitleContainer>
      <Text muted size="medium" fontWeight={400} lineHeight={1.6}>
        {text}
      </Text>
    </CardContainer>
  );
};

export default SlideCard;
