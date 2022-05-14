import React, { memo } from "react";
import { Text, IconButton, Button } from "../../atoms";
import {
  Container,
  Sheet,
  Overlay,
  Header,
  Footer,
  Body,
  GlobalStyle,
} from "./styles";
import { useTheme } from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { ModalProps } from "./types";

const AnimatedModal = animated(Container);
const AnimatedSheet = animated(Sheet);

const Modal: React.FC<ModalProps> = ({
  size = "small",
  isOpen = false,
  expandMobile = true,
  title,
  onClose,
  buttons,
  minHeight,
  children,
}) => {
  const theme = useTheme();

  const transitionModal = useTransition(isOpen, {
    config: isOpen ? { ...config.stiff, duration: 300 } : { duration: 300 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const transitionSheet = useTransition(isOpen, {
    config: isOpen ? { ...config.stiff, duration: 300 } : { duration: 300 },
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
                            variant={isLastItem ? "primary" : "neutral"}
                            onClick={item.onClick}
                            ml={theme.spacing.s1}
                          >
                            {item.text}
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
