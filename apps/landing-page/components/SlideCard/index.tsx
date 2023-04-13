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
   * Time for the underline animation in seconds
   * */
  animationTime?: number;
}

const SlideCard = ({
  title,
  text,
  icon,
  isActive = false,
  onClick,
  animationTime = 10,
}: SlideCardProps) => {
  const theme = useTheme();

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
          color={isActive ? theme.colors.primary : theme.colors.black}
        />
        <Text ml={theme.spacing.s3} size="large">
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
