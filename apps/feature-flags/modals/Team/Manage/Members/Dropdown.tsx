import React from "react";
import { animated } from "react-spring";
import { useFloatingPopup } from "@basestack/hooks";
import {
  Button,
  ButtonVariant,
  Popup,
  PopupProps,
} from "@basestack/design-system";
import { rem } from "polished";

const AnimatedPopup = animated(Popup);

interface DropdownProps {
  button: string;
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
    <div ref={popupWrapperRef}>
      <Button
        {...getReferenceProps}
        ref={refs.setReference}
        onClick={onClickMore}
        variant={ButtonVariant.Outlined}
        icon={isPopupOpen ? "arrow_drop_up" : "arrow_drop_down"}
        iconPlacement="right"
        pr={rem("6px")}
      >
        {button}
      </Button>
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
    </div>
  );
};

export default Dropdown;
