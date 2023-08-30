import React from "react";
import { useStore } from "store";
import { useFloatingPopup } from "@basestack/hooks";
import {
  Card,
  Text,
  Popup,
  Button,
  ButtonVariant,
} from "@basestack/design-system";
import { useTheme } from "styled-components";
import {
  ContentContainer,
  MenuContainer,
  PopupWrapper,
  TextContainer,
} from "./styles";
import { animated } from "react-spring";

const AnimatedPopup = animated(Popup);

const ModalCard = () => {
  const theme = useTheme();
  const isDarkMode = useStore((state) => state.isDarkMode);
  const setDarkMode = useStore((state) => state.setDarkMode);

  const {
    popupWrapperRef,
    x,
    y,
    refs,
    strategy,
    transition,
    isPopupOpen,
    getReferenceProps,
    getFloatingProps,
    onClickMore,
    onCloseMenu,
  } = useFloatingPopup({ placement: "bottom-start" });

  return (
    <Card p={theme.spacing.s5}>
      <ContentContainer>
        <TextContainer>
          <Text size="large">App Theme</Text>
          <Text>Choose between light and dark mode theme.</Text>
        </TextContainer>
        <MenuContainer>
          <Button
            onClick={onClickMore}
            {...getReferenceProps}
            ref={refs.setReference}
            variant={ButtonVariant.Tertiary}
            icon={isPopupOpen ? "arrow_drop_up" : "arrow_drop_down"}
            iconPlacement="right"
          >
            {isDarkMode ? "Dark" : "Light"}
          </Button>
          <PopupWrapper ref={popupWrapperRef}>
            {transition(
              (styles, item) =>
                item && (
                  <AnimatedPopup
                    {...getFloatingProps}
                    ref={refs.setFloating}
                    style={styles}
                    position={strategy}
                    top={y + 4}
                    left={x}
                    items={[
                      { text: "Light", onClick: () => setDarkMode(false) },
                      { text: "Dark", onClick: () => setDarkMode(true) },
                    ]}
                    onClickList={onCloseMenu}
                  />
                ),
            )}
          </PopupWrapper>
        </MenuContainer>
      </ContentContainer>
    </Card>
  );
};

export default ModalCard;
