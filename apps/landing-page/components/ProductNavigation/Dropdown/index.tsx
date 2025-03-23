import React, { memo, useCallback, useRef, useState } from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway, useMedia } from "react-use";
import {
  slideBottom,
  Button,
  ButtonVariant,
  ButtonSize,
} from "@basestack/design-system";
import {
  Dropdown as StyledDropdown,
  Container,
  List,
  ListItem,
} from "./styles";
import { useTheme } from "styled-components";
import { useRouter } from "next/navigation";

const AnimatedDropdown: any = animated(StyledDropdown);

export interface ItemProps {
  text: string;
  href: string;
  icon: string;
  isExternal?: boolean;
}

export interface AppsDropdownProps {
  data: Array<ItemProps>;
  title: string;
}

const Dropdown = ({ data, title }: AppsDropdownProps) => {
  const { device } = useTheme();
  const isMobile = useMedia(device.max.md, false);
  const router = useRouter();

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

  if (!isMobile) return null;

  return (
    <Container ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
        variant={ButtonVariant.Neutral}
        onClick={onClickMenu}
        size={ButtonSize.Normal}
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
                  <ListItem key={index}>
                    <Button
                      variant={ButtonVariant.Neutral}
                      onClick={() => {
                        if (item.isExternal) {
                          window.open(item.href, "_blank");
                        } else {
                          router.push(item.href);
                        }
                        setIsMenuOpen(false);
                      }}
                      size={ButtonSize.Normal}
                      icon={item.icon}
                      iconPlacement="left"
                      fullWidth
                    >
                      {item.text}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </AnimatedDropdown>
          ),
      )}
    </Container>
  );
};

export default memo(Dropdown);
