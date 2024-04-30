import { memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { BannerVariant } from "./types";
// Components
import Text from "../Text";
import Icon from "../Icon";
import {
  Button,
  RightContentWrapper,
  Container,
  TextContainer,
  Wrapper,
} from "./styles";

export interface BannerProps extends SpaceProps {
  /**
   * Label variants
   */
  variant?: BannerVariant;
  /**
   * title
   */
  title: string;
  /**
   * description
   */
  description?: string;
  /**
   * Optional icon
   */
  showIcon?: boolean;
  /**
   * Dismiss banner
   */
  onDismiss?: () => void;
  /**
   * Applies max width to content
   */
  maxWidth?: number;
  /**
   * Overwrites default border radius
   */
  borderRadius?: number;
  /**
   * Changes from solid colors to transparent if true
   */
  isTranslucent?: boolean;
}

const Banner = ({
  title,
  description,
  variant = "info",
  showIcon = true,
  isTranslucent = false,
  onDismiss,
  maxWidth,
  borderRadius,
  ...props
}: BannerProps) => {
  const theme = useTheme();

  const getVariant = () => {
    switch (variant) {
      default:
      case "info":
        return {
          icon: "info",
          solid: {
            color: theme.banner.solid.info.color,
            bg: theme.banner.solid.info.backgroundColor,
          },
          translucent: {
            color: theme.banner.translucent.info.color,
            bg: theme.banner.translucent.info.backgroundColor,
          },
        };
      case "warning":
        return {
          icon: "warning",
          solid: {
            color: theme.banner.solid.warning.color,
            bg: theme.banner.solid.warning.backgroundColor,
          },
          translucent: {
            color: theme.banner.translucent.warning.color,
            bg: theme.banner.translucent.warning.backgroundColor,
          },
        };
      case "success":
        return {
          icon: "check_circle",
          solid: {
            color: theme.banner.solid.success.color,
            bg: theme.banner.solid.success.backgroundColor,
          },
          translucent: {
            color: theme.banner.translucent.success.color,
            bg: theme.banner.translucent.success.backgroundColor,
          },
        };
      case "danger":
        return {
          icon: "report",
          solid: {
            color: theme.banner.solid.danger.color,
            bg: theme.banner.solid.danger.backgroundColor,
          },
          translucent: {
            color: theme.banner.translucent.danger.color,
            bg: theme.banner.translucent.danger.backgroundColor,
          },
        };
    }
  };

  const textColor = getVariant()[isTranslucent ? "translucent" : "solid"].color;

  return (
    <Container
      borderRadius={borderRadius}
      bg={getVariant()[isTranslucent ? "translucent" : "solid"].bg}
      variant={variant}
      isTranslucent={isTranslucent}
      {...props}
    >
      <Wrapper maxWidth={maxWidth}>
        {showIcon && (
          <Icon
            color={textColor}
            icon={getVariant().icon}
            mr={theme.spacing.s4}
          />
        )}
        <TextContainer>
          <Text size={!!description ? "medium" : "small"} color={textColor}>
            {title}
          </Text>
          {!!description && <Text color={textColor}>{description}</Text>}
        </TextContainer>
        {onDismiss && (
          <RightContentWrapper>
            <Button onClick={onDismiss}>
              <Icon icon="close" color={textColor} />
            </Button>
          </RightContentWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default memo(Banner);
