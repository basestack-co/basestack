import { IconBox, Text } from "@basestack/design-system";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import {
  CardContainer,
  ContentContainer,
  InnerContentContainer,
  StyledCard,
  TextContainer,
} from "./styles";

export interface CardProps {
  title: string;
  description?: string;
  icon?: string;
}

const CardComp = ({ title, description, icon = "help" }: CardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();
  const isTouchDevice = useMedia("(hover: none)", false);
  const [showContent, setShowContent] = useState<boolean>(false);

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

  useEffect(() => {
    if (!isTouchDevice) {
      setShowContent(false);
    }
  }, [isTouchDevice]);

  return (
    <CardContainer
      onClick={
        isTouchDevice ? () => setShowContent((prev) => !prev) : undefined
      }
    >
      <StyledCard>
        <ContentContainer>
          <IconBox size="large" icon={icon} mb={spacing.s5} {...iconBoxProps} />
          <TextContainer>
            <Text size="large" textAlign="center">
              {title}
            </Text>
          </TextContainer>
        </ContentContainer>

        {description && (
          <InnerContentContainer
            isVisible={showContent}
            className="inner-content"
          >
            <Text size="medium" fontWeight={400} textAlign="center" muted>
              {description}
            </Text>
          </InnerContentContainer>
        )}
      </StyledCard>
    </CardContainer>
  );
};

export default CardComp;
