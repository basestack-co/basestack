import React, { memo, useCallback, useRef, useState } from "react";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import {
  Logo,
  LogoProps,
  slideBottom,
  Text,
  Button,
  ButtonVariant,
  ButtonSize,
  IconBox,
} from "@basestack/design-system";
// Styles
import {
  Dropdown as StyledDropdown,
  Container,
  List,
  ListItem,
  StyledButton,
  TextContainer,
} from "./styles";

const AnimatedDropdown: any = animated(StyledDropdown);

export interface ItemProps {
  onClick: () => void;
  title: string;
  description: string;
  icon: string;
}

export interface AppsDropdownProps {
  data: Array<ItemProps>;
  title: string;
}

const Item = ({ onClick, title, description, icon }: ItemProps) => {
  return (
    <ListItem>
      <StyledButton onClick={onClick}>
        <IconBox icon={icon} size="medium" />
        <TextContainer>
          <Text size="medium">{title}</Text>
          <Text size="xSmall" muted>
            {description}
          </Text>
        </TextContainer>
      </StyledButton>
    </ListItem>
  );
};

const Dropdown = ({ data, title }: AppsDropdownProps) => {
  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(0)],
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
    <Container
      ref={menuWrapperRef}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <Button
        ref={refs.setReference}
        variant={ButtonVariant.Tertiary}
        onClick={onClickMenu}
        size={ButtonSize.Normal}
        backgroundColor="transparent"
        icon={isMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
      >
        {title}
      </Button>
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
                  <Item key={index} {...item} />
                ))}
              </List>
            </AnimatedDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(Dropdown);
