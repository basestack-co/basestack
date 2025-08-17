import { useFloatingPopup } from "@basestack/hooks";
import { rem } from "polished";
import { animated } from "react-spring";
import { Button, ButtonVariant } from "../Button";
import IconButton, { type IconButtonVariant } from "../IconButton";
import Popup, { type PopupProps } from "../Popup";
import { Container } from "./styles";

const AnimatedPopup = animated(Popup);

interface PopupMenuProps {
  iconButton?: {
    icon?: string;
    variant?: IconButtonVariant;
  };
  button?: {
    text: string;
    variant?: ButtonVariant;
    icon?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    height?: string | number;
  };
  items: PopupProps["items"];
  dropdownPlacement?: "bottom-start" | "bottom-end";
  iconPlacement?: "left" | "right";
}

const PopupMenu = ({
  button,
  items,
  dropdownPlacement = "bottom-end",
  iconPlacement = "right",
  iconButton,
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
  } = useFloatingPopup({ placement: dropdownPlacement });

  const buttonProps = button?.icon
    ? { icon: button.icon }
    : {
        icon: isPopupOpen ? "arrow_drop_up" : "arrow_drop_down",
        pl: iconPlacement === "left" ? rem("6px") : null,
        pr: iconPlacement === "right" ? rem("6px") : null,
      };

  return (
    <Container ref={popupWrapperRef}>
      {button && !!button.text ? (
        <Button
          {...getReferenceProps}
          ref={refs.setReference}
          onClick={onClickMore}
          variant={button.variant || ButtonVariant.Neutral}
          iconPlacement={iconPlacement === "left" ? "left" : "right"}
          isDisabled={button.isDisabled}
          isLoading={button.isLoading}
          {...buttonProps}
        >
          {button.text}
        </Button>
      ) : (
        <IconButton
          {...getReferenceProps}
          ref={refs.setReference}
          onClick={onClickMore}
          icon={iconButton?.icon ?? "more_horiz"}
          variant={iconButton?.variant}
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
