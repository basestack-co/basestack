import React, { memo, forwardRef } from "react";
import { useTheme } from "styled-components";
import { animated } from "react-spring";
import { useFloatingPopup } from "@basestack/hooks";
// Components
import { IconButton, Text, Icon, Label, Card } from "../../atoms";
import {
  Popup,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../molecules";
import { Labels, PopupWrapper, Footer, TooltipContainer } from "./styles";
import { FlagCardProps } from "./types";

const AnimatedPopup = animated(Popup);

const TooltipIcon = ({ icon, text }: { icon: string; text: string }) => {
  const theme = useTheme();

  return (
    <TooltipContainer>
      <Tooltip placement="top">
        <TooltipTrigger>
          <Icon icon={icon} color={theme.colors.gray500} size="small" />
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipContainer>
  );
};

const FlagCard = forwardRef<HTMLDivElement, FlagCardProps>(
  (
    {
      title,
      description,
      environments,
      date,
      popupItems,
      hasPayload = false,
      isExpired = false,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const {
      popupWrapperRef,
      x,
      y,
      refs,
      strategy,
      transition,
      getReferenceProps,
      getFloatingProps,
      onClickMore,
      onCloseMenu,
    } = useFloatingPopup();

    return (
      <Card
        ref={ref}
        testId="flag-card"
        hasHoverAnimation
        p={theme.spacing.s5}
        position="relative"
        {...props}
      >
        <div>
          <Text
            data-testid="flag-title"
            size="large"
            mb={theme.spacing.s2}
            pr={theme.spacing.s7}
            lineTruncate
          >
            {title}
          </Text>
        </div>
        <Text data-testid="flag-description" size="small" mb={theme.spacing.s3}>
          {description}
        </Text>
        <Labels data-testid="flag-labels">
          {environments
            .filter((item) => !!item.name)
            .map((environment) => (
              <Label
                key={environment.id}
                testId={`${environment.name}-flag-label`}
                text={environment.name}
                variant={environment.enabled ? "success" : "default"}
              />
            ))}
        </Labels>
        <Footer>
          <Text data-testid="flag-date" mt="auto" size="small" muted mr="auto">
            {date}
          </Text>
          {hasPayload && <TooltipIcon icon="data_object" text="Payload" />}
          {isExpired && <TooltipIcon icon="timer_off" text="Expired" />}
        </Footer>
        <PopupWrapper ref={popupWrapperRef}>
          <IconButton
            {...getReferenceProps}
            ref={refs.setReference}
            position="absolute"
            top="14px"
            right="14px"
            icon="more_horiz"
            onClick={onClickMore}
          />
          {transition(
            (styles, item) =>
              item &&
              popupItems.length > 0 && (
                <AnimatedPopup
                  {...getFloatingProps}
                  ref={refs.setFloating}
                  style={styles}
                  position={strategy}
                  top={y}
                  left={x}
                  items={popupItems}
                  onClickList={onCloseMenu}
                />
              ),
          )}
        </PopupWrapper>
      </Card>
    );
  },
);

FlagCard.displayName = "FlagCard";

export default memo(FlagCard);
