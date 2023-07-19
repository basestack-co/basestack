import React, { memo, forwardRef } from "react";
import { useTheme } from "styled-components";
import { useFloatingPopup } from "@basestack/hooks";
import { animated } from "react-spring";
// Components
import {
  Text,
  IconButton,
  Card,
  Popup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
import {
  Labels,
  Label,
  CardWrapper,
  PopupWrapper,
  TooltipContainer,
} from "./styles";
import { FlagRowProps } from "./types";

const AnimatedPopup = animated(Popup);

const FlagRow = forwardRef<HTMLDivElement, FlagRowProps>(
  (
    { title, description, environments, popupItems = [], date, ...props },
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
        p={`${theme.spacing.s2} ${theme.spacing.s3}`}
        {...props}
      >
        <CardWrapper>
          <Labels data-testid="flag-labels">
            {environments.map((environment, index, { length }) => (
              <TooltipContainer
                key={environment.id}
                index={index}
                length={length}
              >
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Label
                      data-testid={`${environment.name}-flag-label`}
                      isActive={environment.enabled}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{environment.name}</TooltipContent>
                </Tooltip>
              </TooltipContainer>
            ))}
          </Labels>
          <Text data-testid="flag-title" size="large" lineTruncate>
            {title}
          </Text>
          <Text data-testid="flag-description" size="small" lineTruncate>
            {!!description ? description : "-"}
          </Text>
          <Text data-testid="flag-date" size="small" muted lineTruncate>
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
                ),
            )}
          </PopupWrapper>
        </CardWrapper>
      </Card>
    );
  },
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);