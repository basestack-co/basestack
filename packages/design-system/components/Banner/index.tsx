import { memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { BannerVariant } from "./types";
// Components
import Text from "../Text";
import Icon from "../Icon";
import {
  Button,
  ButtonWrapper,
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
}

const Banner = ({
  title,
  description,
  variant = "info",
  showIcon = true,
  onDismiss,
  ...props
}: BannerProps) => {
  const theme = useTheme();

  const getVariant = () => {
    switch (variant) {
      default:
      case "info":
        return {
          icon: "info",
          color: theme.banner.info.color,
          bg: theme.banner.info.backgroundColor,
        };
      case "warning":
        return {
          icon: "warning",
          color: theme.banner.warning.color,
          bg: theme.banner.warning.backgroundColor,
        };
      case "success":
        return {
          icon: "check_circle",
          color: theme.banner.success.color,
          bg: theme.banner.success.backgroundColor,
        };
      case "danger":
        return {
          icon: "report",
          color: theme.banner.danger.color,
          bg: theme.banner.danger.backgroundColor,
        };
    }
  };

  return (
    <Container bg={getVariant().bg} variant={variant} {...props}>
      <Wrapper>
        {showIcon && (
          <Icon
            color={getVariant().color}
            icon={getVariant().icon}
            mr={theme.spacing.s4}
          />
        )}
        <TextContainer>
          <Text
            size={!!description ? "medium" : "small"}
            color={getVariant().color}
          >
            {title}
          </Text>
          {!!description && (
            <Text color={getVariant().color}>{description}</Text>
          )}
        </TextContainer>
        {onDismiss && (
          <ButtonWrapper>
            <Button onClick={onDismiss}>
              <Icon icon="close" color={getVariant().color} />
            </Button>
          </ButtonWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default memo(Banner);
