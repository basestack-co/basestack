import React, { memo, forwardRef, useState, useCallback, useRef } from "react";
import { useTheme } from "styled-components";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useTransition, animated, config } from "react-spring";
import { Text, IconButton } from "../../atoms";
import { Labels, StyledCard, Label, CardWrapper, PopupWrapper } from "./styles";
import { scaleInTopRight } from "../../animations/springs";
import { Popup } from "../../molecules";
import { FlagRowProps } from "./types";
import { useClickAway } from "@basestack/hooks";

const AnimatedPopup = animated(Popup);

const FlagRow = forwardRef<HTMLDivElement, FlagRowProps>(
  (
    { title, description, environments, popupItems = [], date, ...props },
    ref
  ) => {
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
        <CardWrapper>
          <Labels data-testid="flag-labels">
            {environments.map((environment, index, { length }) => {
              return (
                <Label
                  key={index.toString()}
                  index={index}
                  length={length}
                  data-testid={`${environment.text}-flag-label`}
                  isActive={environment.isFlagOn}
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
              ref={reference}
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
        </CardWrapper>
      </StyledCard>
    );
  }
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);
