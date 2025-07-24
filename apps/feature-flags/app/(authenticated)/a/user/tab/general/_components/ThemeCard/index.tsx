// Components
import {
  Button,
  ButtonVariant,
  Card,
  Popup,
  Text,
} from "@basestack/design-system";
// Hooks
import { useFloatingPopup } from "@basestack/hooks";
// Locales
import { useTranslations } from "next-intl";
import { animated } from "react-spring";
// Store
import { useStore } from "store";
import { useTheme } from "styled-components";
// Styles
import {
  ContentContainer,
  MenuContainer,
  PopupWrapper,
  TextContainer,
} from "./styles";

const AnimatedPopup = animated(Popup);

const ModalCard = () => {
  const t = useTranslations("profile");
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
          <Text size="large">{t("general.card.theme.title")}</Text>
          <Text>{t("general.card.theme.description")}</Text>
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
            {isDarkMode
              ? t("general.card.theme.type.dark")
              : t("general.card.theme.type.light")}
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
                      {
                        text: t("general.card.theme.type.light"),
                        onClick: () => setDarkMode(false),
                      },
                      {
                        text: t("general.card.theme.type.dark"),
                        onClick: () => setDarkMode(true),
                      },
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
