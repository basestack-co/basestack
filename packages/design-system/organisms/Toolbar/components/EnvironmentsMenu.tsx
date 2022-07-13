import React, { memo, useCallback, useRef, useState } from "react";
import { useClickAway } from "@basestack/hooks";
import { autoUpdate, useFloating } from "@floating-ui/react-dom";
import { useTheme } from "styled-components";
import { animated, config, useTransition } from "react-spring";
import { Button, ButtonVariant } from "../../../atoms";
import { Popup } from "../../../molecules";
import { scaleInTopLeft } from "../../../animations/springs";

const AnimatedMenu = animated(Popup);

export interface EnvironmentsMenuProps {
  title: string;
  environments: Array<string>;
  onSelect: (item: string) => void;
}

const EnvironmentsMenu = ({
  title,
  environments,
  onSelect,
}: EnvironmentsMenuProps) => {
  const theme = useTheme();
  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  const onClickMore = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const transitionMorePopup = useTransition(isMenuOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopLeft,
  });

  const items = environments.map((item) => {
    return {
      text: item,
      onClick: () => {
        setIsMenuOpen(false);
        onSelect(item);
      },
    };
  });

  useClickAway(menuWrapperRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <div ref={menuWrapperRef}>
      <Button
        ref={reference}
        iconPlacement="right"
        icon={isMenuOpen ? "expand_less" : "expand_more"}
        variant={ButtonVariant.Tertiary}
        fontWeight={400}
        onClick={onClickMore}
        ml={theme.spacing.s5}
      >
        {title === "all"
          ? "All Environments"
          : title.charAt(0).toUpperCase() + title.slice(1)}
      </Button>
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedMenu
              style={styles}
              ref={floating}
              position={strategy}
              top={y}
              left={x}
              items={items}
            />
          )
      )}
    </div>
  );
};

export default memo(EnvironmentsMenu);
