import React from "react";
import { animated } from "react-spring";
import { rem } from "polished";
import {
  Button,
  ButtonVariant,
  Popup,
  IconButton,
} from "@basestack/design-system";
import { useFloatingPopup } from "@basestack/hooks";
import { ListItem, PopupButtonWrapper, PopupIconWrapper } from "./styles";
import { PopupMenuProps } from "./types";

const AnimatedPopup = animated(Popup);

const PopupMenu = ({
  icon,
  text,
  items,
  width,
  onClear,
  openIcon,
  isDisabled,
}: PopupMenuProps) => {
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
    <ListItem ref={popupWrapperRef}>
      <PopupButtonWrapper {...getReferenceProps} ref={refs.setReference}>
        <Button
          icon={isPopupOpen && openIcon ? openIcon : icon}
          onClick={onClickMore}
          variant={ButtonVariant.Tertiary}
          iconPlacement="left"
          pr={onClear ? rem("44px") : null}
          isDisabled={isDisabled}
        >
          {text}
        </Button>
        {onClear && (
          <PopupIconWrapper>
            <IconButton
              onClick={onClear}
              icon="close"
              size="small"
              variant="secondaryDark"
            />
          </PopupIconWrapper>
        )}
      </PopupButtonWrapper>
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
