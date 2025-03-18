import React, { memo, useCallback, useRef, useState } from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import { rem } from "polished";
import { useTheme } from "styled-components";
import {
  slideBottom,
  Text,
  Button,
  ButtonVariant,
  ButtonSize,
  IconBox,
  Icon,
} from "@basestack/design-system";
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
  description?: string;
  icon: string;
  isExternal?: boolean;
}

export interface AppsDropdownProps {
  data: Array<ItemProps>;
  title: string;
  placement?: "right" | "left";
  buttonVariant?: ButtonVariant;
}

const Item = ({ onClick, title, description, icon, isExternal }: ItemProps) => {
  const { spacing } = useTheme();

  return (
    <ListItem>
      <StyledButton onClick={onClick}>
        <IconBox icon={icon} size="small" />
        <TextContainer>
          <Text size="small" fontWeight={500}>
            {title}
          </Text>
          {description && (
            <Text size="xSmall" muted>
              {description}
            </Text>
          )}
        </TextContainer>
        {isExternal && <Icon ml={spacing.s3} muted icon="open_in_new" />}
      </StyledButton>
    </ListItem>
  );
};

const Dropdown = ({
  data,
  title,
  placement = "left",
  buttonVariant = ButtonVariant.Neutral,
}: AppsDropdownProps) => {
  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: placement === "left" ? "bottom-start" : "bottom-end",
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
    <Container ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
        variant={buttonVariant}
        onClick={onClickMenu}
        size={ButtonSize.Normal}
        icon={isMenuOpen ? "arrow_drop_up" : "arrow_drop_down"}
        pr={rem("8px")}
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
                  <Item
                    key={index}
                    {...item}
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false);
                    }}
                  />
                ))}
              </List>
            </AnimatedDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(Dropdown);
