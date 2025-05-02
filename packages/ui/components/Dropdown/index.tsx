import React from "react";
import { animated } from "react-spring";
import { useFloatingPopup } from "@basestack/hooks";
import {
  Button,
  ButtonVariant,
  Popup,
  PopupProps,
  IconButton,
} from "@basestack/design-system";
import { rem } from "polished";
import { Container } from "./styles";

const AnimatedPopup = animated(Popup);

interface DropdownProps {
  button?: {
    text: string;
    variant?: ButtonVariant;
    icon?: string;
  };
  items: PopupProps["items"];
}

const Dropdown = ({ button, items }: DropdownProps) => {
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

export { type DropdownProps };

export default Dropdown;
