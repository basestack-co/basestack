import React, { memo, forwardRef, useState, useCallback, useRef } from "react";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useClickAway } from "sh-hooks";
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
    const { x, y, reference, floating, strategy } = useFloating({
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
          {environments.map((environment, index) => {
            return (
              !!environment.text && (
                <StyledLabel
                  key={index.toString()}
                  testId={`${environment.text}-flag-label`}
                  text={environment.text}
                  variant={environment.isFlagOn ? "success" : "default"}
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
            ref={reference}
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
                  ref={floating}
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
