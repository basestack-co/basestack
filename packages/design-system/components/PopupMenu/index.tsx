import { useFloatingPopup } from "@basestack/hooks";
import { rem } from "polished";
import React from "react";
import { animated } from "react-spring";
import { Button, ButtonVariant } from "../Button";
import IconButton from "../IconButton";
import Popup, { type PopupProps } from "../Popup";
import { Container } from "./styles";

const AnimatedPopup = animated(Popup);

interface PopupMenuProps {
  button?: {
    text: string;
    variant?: ButtonVariant;
    icon?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
  };
  items: PopupProps["items"];
}

const PopupMenu = ({ button, items }: PopupMenuProps) => {
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
    isPopupOpen,
  } = useFloatingPopup({});

  return (
    <Container ref={popupWrapperRef}>
      {button && !!button.text ? (
        <Button
          {...getReferenceProps}
          ref={refs.setReference}
          onClick={onClickMore}
          variant={button.variant || ButtonVariant.Neutral}
          icon={isPopupOpen ? "arrow_drop_up" : "arrow_drop_down"}
          iconPlacement="right"
          pr={rem("6px")}
          isDisabled={button.isDisabled}
          isLoading={button.isLoading}
        >
          {button.text}
        </Button>
      ) : (
        <IconButton
          {...getReferenceProps}
          ref={refs.setReference}
          onClick={onClickMore}
          icon="more_horiz"
        />
      )}
      {transition(
        (styles, item) =>
          item &&
          items.length > 0 && (
            <AnimatedPopup
              {...getFloatingProps}
              ref={refs.setFloating}
              style={styles}
              position={strategy}
              top={y}
              left={x}
              items={items}
              onClickList={onCloseMenu}
            />
          ),
      )}
    </Container>
  );
};

export type { PopupMenuProps };

export default PopupMenu;
