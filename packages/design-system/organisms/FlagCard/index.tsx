import React, { memo, forwardRef, useState, useCallback, useRef } from "react";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useClickAway } from "@basestack/hooks";
import { useTheme } from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { IconButton, Text } from "../../atoms";
import { Popup } from "../../molecules";
import { Labels, StyledCard, StyledLabel, PopupWrapper } from "./styles";
import { FlagCardProps } from "./types";
import { scaleInTopRight } from "../../animations/springs";

const AnimatedPopup = animated(Popup);

const FlagCard = forwardRef<HTMLDivElement, FlagCardProps>(
  ({ title, description, environments, date, popupItems, ...props }, ref) => {
    const theme = useTheme();
    const popupWrapperRef = useRef(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { x, y, strategy, refs } = useFloating({
      placement: "bottom-end",
      whileElementsMounted: autoUpdate,
    });

    const onClickMore = useCallback(() => {
      setIsPopupOpen((prevState) => !prevState);
    }, []);

    const transitionPopup = useTransition(isPopupOpen, {
      config: { ...config.default, duration: 150 },
      ...scaleInTopRight,
    });

    useClickAway(popupWrapperRef, () => {
      setIsPopupOpen(false);
    });

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
            ref={refs.setReference}
            position="absolute"
            top="14px"
            right="14px"
            icon="more_horiz"
            onClick={onClickMore}
          />
          {transitionPopup(
            (styles, item) =>
              item &&
              popupItems.length > 0 && (
                <AnimatedPopup
                  style={styles}
                  ref={refs.setFloating}
                  position={strategy}
                  top={y}
                  left={x}
                  items={popupItems}
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
