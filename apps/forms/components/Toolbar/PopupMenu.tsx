import React from "react";
import { animated } from "react-spring";
import { Button, ButtonVariant, Popup } from "@basestack/design-system";
import { useFloatingPopup } from "@basestack/hooks";
import { ListItem } from "./styles";
import { PopupMenuProps } from "./types";

const AnimatedPopup = animated(Popup);

const PopupMenu = ({ icon, text, items, width }: PopupMenuProps) => {
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
  } = useFloatingPopup({});

  return (
    <ListItem ref={popupWrapperRef}>
      <Button
        {...getReferenceProps}
        ref={refs.setReference}
        icon={icon}
        onClick={onClickMore}
        variant={ButtonVariant.Tertiary}
        iconPlacement="left"
      >
        {text}
      </Button>
      {transition(
        (styles, item) =>
          item && (
            <AnimatedPopup
              {...getFloatingProps}
              ref={refs.setFloating}
              style={styles}
              position={strategy}
              top={y + 5}
              left={x}
              items={items}
              onClickList={onCloseMenu}
              width={width}
            />
          ),
      )}
    </ListItem>
  );
};

export default PopupMenu;
