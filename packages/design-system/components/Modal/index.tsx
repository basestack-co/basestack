import { rem } from "polished";
import React, { memo } from "react";
import { animated, config, useTransition } from "react-spring";
import { useTheme } from "styled-components";
import { fadeIn } from "../../animations/springs";
import { Button, ButtonVariant } from "../Button";
import IconButton from "../IconButton";
import Text from "../Text";
import {
  Body,
  Container,
  ContentContainer,
  Footer,
  GlobalStyle,
  Header,
  Overlay,
  Sheet,
} from "./styles";
import { ModalProps } from "./types";

const AnimatedModal = animated(Container);
const AnimatedSheet = animated(Sheet);

const Modal: React.FC<ModalProps> = ({
  size = "small",
  isOpen = false,
  expandMobile = false,
  closeOnClickOutside = true,
  title,
  onClose,
  buttons,
  minHeight,
  children,
  onAnimationEnd,
}) => {
  const theme = useTheme();

  const transitionModal = useTransition(isOpen, {
    config: { ...config.stiff, duration: 300 },
    ...fadeIn,
    onRest: () => {
      if (!isOpen && typeof onAnimationEnd === "function") {
        onAnimationEnd();
      }
    },
  });

  const transitionSheet = useTransition(isOpen, {
    config: { ...config.stiff, duration: 300 },
    from: { opacity: 0, transform: `translate3d(0px, 50px, 0px)` },
    enter: { opacity: 1, transform: `translate3d(0px, 0px, 0px)` },
    leave: { opacity: 0, transform: `translate3d(0px, 50px, 0px)` },
  });

  return transitionModal(
    (styles, item) =>
      item && (
        <AnimatedModal
          expandMobile={expandMobile}
          style={styles}
          data-testid="modal-container"
        >
          <GlobalStyle />
          {transitionSheet(
            (styles, item) =>
              item && (
                <AnimatedSheet
                  size={size}
                  minHeight={minHeight ?? 0}
                  style={styles}
                >
                  <Header>
                    <Text size="xLarge" mr={theme.spacing.s2}>
                      {title}
                    </Text>
                    <IconButton ml="auto" onClick={onClose} icon="close" />
                  </Header>
                  <ContentContainer>
                    <Body
                      pb={buttons && buttons.length > 0 ? "2px" : rem("22px")}
                    >
                      {children}
                    </Body>
                    {buttons && buttons.length > 0 && (
                      <Footer expandMobile={expandMobile}>
                        {buttons.map((item, index, { length }) => {
                          const isLastItem = index + 1 === length;
                          return (
                            <Button
                              key={index.toString()}
                              variant={
                                item.variant
                                  ? item.variant
                                  : isLastItem
                                    ? ButtonVariant.Primary
                                    : ButtonVariant.Neutral
                              }
                              onClick={item.onClick}
                              isDisabled={item.isDisabled}
                              isLoading={item.isLoading}
                              ml={theme.spacing.s1}
                            >
                              {item.children}
                            </Button>
                          );
                        })}
                      </Footer>
                    )}
                  </ContentContainer>
                </AnimatedSheet>
              ),
          )}
          <Overlay {...(closeOnClickOutside ? { onClick: onClose } : {})} />
        </AnimatedModal>
      ),
  );
};

export { type ModalProps };

export default memo(Modal);
