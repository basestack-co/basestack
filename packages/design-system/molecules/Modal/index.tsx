import React, { memo, useState, useEffect } from "react";
import { Button, ButtonVariant, IconButton, Text } from "../../atoms";
import {
  Body,
  Container,
  Footer,
  GlobalStyle,
  Header,
  Overlay,
  Sheet,
} from "./styles";
import { useTheme } from "styled-components";
import { animated, config, useTransition } from "react-spring";
import { ModalProps } from "./types";
import { fadeIn } from "../../animations/springs";

const AnimatedModal = animated(Container);
const AnimatedSheet = animated(Sheet);

const Modal: React.FC<ModalProps> = ({
  size = "small",
  isOpen = false,
  expandMobile = false,
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
    onRest: (result: any) => {
      if (!result && onAnimationEnd) {
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
                  expandMobile={expandMobile}
                  size={size}
                  minHeight={minHeight}
                  style={styles}
                >
                  <Header>
                    <Text size="xLarge" mr={theme.spacing.s2}>
                      {title}
                    </Text>
                    <IconButton ml="auto" onClick={onClose} icon="close" />
                  </Header>
                  <Body>{children}</Body>
                  <Footer>
                    {buttons &&
                      buttons.map((item, index, { length }) => {
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
                </AnimatedSheet>
              )
          )}
          <Overlay onClick={onClose} />
        </AnimatedModal>
      )
  );
};

export default memo(Modal);
