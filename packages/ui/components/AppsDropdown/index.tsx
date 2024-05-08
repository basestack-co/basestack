import React, { memo, useCallback, useRef, useState } from "react";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import {
  Logo,
  LogoProps,
  IconButton,
  slideBottom,
  Text,
} from "@basestack/design-system";
// Styles
import { useTheme } from "styled-components";
import {
  Dropdown,
  Container,
  List,
  ListItem,
  Button,
  TextContainer,
} from "./styles";

const AnimatedDropdown = animated(Dropdown);

export interface ItemProps {
  onClick: () => void;
  product: LogoProps["product"];
  title: string;
  description: string;
  isActive: boolean;
}

export interface AppsDropdownProps {
  data: Array<ItemProps>;
}

const Item = ({
  onClick,
  product,
  title,
  description,
  isActive = false,
}: ItemProps) => {
  return (
    <ListItem>
      <Button isActive={isActive} onClick={onClick}>
        <Logo product={product} size={32} />
        <TextContainer>
          <Text size="medium">{title}</Text>
          <Text size="xSmall" muted>
            {description}
          </Text>
        </TextContainer>
      </Button>
    </ListItem>
  );
};

const AppsDropdown = ({ data }: AppsDropdownProps) => {
  const theme = useTheme();

  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
  });

  const onClickMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const transitionMorePopup = useTransition(isMenuOpen, {
    config: { ...config.default, duration: 150 },
    ...slideBottom,
  });

  useClickAway(menuWrapperRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <Container ref={menuWrapperRef}>
      <IconButton
        ref={refs.setReference}
        icon="apps"
        size="mediumLarge"
        onClick={onClickMenu}
        variant="primaryNeutral"
      />
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedDropdown
              style={styles}
              ref={refs.setFloating}
              position={strategy}
              top={y}
              left={x}
            >
              <List>
                {data.map((item, index) => (
                  <Item
                    key={index}
                    onClick={item.onClick}
                    product={item.product}
                    title={item.title}
                    description={item.description}
                    isActive={item.isActive}
                  />
                ))}
              </List>
            </AnimatedDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(AppsDropdown);
