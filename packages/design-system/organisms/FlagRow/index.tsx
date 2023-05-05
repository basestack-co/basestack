import React, { memo, forwardRef } from "react";
import { useTheme } from "styled-components";
import { useFloatingPopup } from "@basestack/hooks";
import { animated } from "react-spring";
// Components
import { Text, IconButton } from "../../atoms";
import { Popup } from "../../molecules";
import { Labels, StyledCard, Label, CardWrapper, PopupWrapper } from "./styles";
import { FlagRowProps } from "./types";

const AnimatedPopup = animated(Popup);

const FlagRow = forwardRef<HTMLDivElement, FlagRowProps>(
  (
    { title, description, environments, popupItems = [], date, ...props },
    ref
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
      <StyledCard
        ref={ref}
        testId="flag-card"
        hasHoverAnimation
        p={theme.spacing.s5}
        {...props}
      >
        <CardWrapper>
          <Labels data-testid="flag-labels">
            {environments.map((environment, index, { length }) => {
              return (
                <Label
                  key={environment.id}
                  index={index}
                  length={length}
                  data-testid={`${environment.name}-flag-label`}
                  isActive={environment.enabled}
                />
              );
            })}
          </Labels>
          <Text data-testid="flag-title" size="large">
            {title}
          </Text>
          <Text data-testid="flag-description" size="small">
            {description}
          </Text>
          <Text data-testid="flag-date" size="small" muted>
            {date}
          </Text>
          <PopupWrapper ref={popupWrapperRef}>
            <IconButton
              {...getReferenceProps}
              ref={refs.setReference}
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
        </CardWrapper>
      </StyledCard>
    );
  }
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);
