import React, { memo, forwardRef } from "react";
import { useTheme } from "styled-components";
import { animated } from "react-spring";
import { useFloatingPopup } from "@basestack/hooks";
// Components
import { IconButton, Text } from "../../atoms";
import { Popup } from "../../molecules";
import { Labels, StyledCard, StyledLabel, PopupWrapper } from "./styles";
import { FlagCardProps } from "./types";

const AnimatedPopup = animated(Popup);

const FlagCard = forwardRef<HTMLDivElement, FlagCardProps>(
  ({ title, description, environments, date, popupItems, ...props }, ref) => {
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
      <StyledCard
        ref={ref}
        testId="flag-card"
        hasHoverAnimation
        p={theme.spacing.s5}
        {...props}
      >
        <Text data-testid="flag-title" size="large" mb={theme.spacing.s2}>
          {title}
        </Text>
        <Text data-testid="flag-description" size="small" mb={theme.spacing.s3}>
          {description}
        </Text>
        <Labels data-testid="flag-labels">
          {environments.map((environment) => {
            return (
              !!environment.name && (
                <StyledLabel
                  key={environment.id}
                  testId={`${environment.name}-flag-label`}
                  text={environment.name}
                  variant={environment.enabled ? "success" : "default"}
                />
              )
            );
          })}
        </Labels>
        <Text data-testid="flag-date" mt="auto" size="small" muted>
          {date}
        </Text>
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
              )
          )}
        </PopupWrapper>
      </StyledCard>
    );
  }
);

FlagCard.displayName = "FlagCard";

export default memo(FlagCard);
