import React, { memo, useCallback, useRef, useState, useMemo } from "react";
import { useClickAway } from "@basestack/hooks";
import { autoUpdate, useFloating } from "@floating-ui/react-dom";
import { useTheme } from "styled-components";
import { animated, config, useTransition } from "react-spring";
import { Popup, Button, ButtonVariant } from "@basestack/design-system";
import { scaleInTopLeft } from "@basestack/design-system/animations/springs";
import { RouterOutput } from "libs/trpc";

const AnimatedMenu = animated(Popup);

export interface EnvironmentsMenuProps {
  title: string;
  data?: RouterOutput["environment"]["all"];
  onSelect: (item: string) => void;
}

const EnvironmentsMenu = ({ title, data, onSelect }: EnvironmentsMenuProps) => {
  const theme = useTheme();
  const menuWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
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

  const items = useMemo(() => {
    if (!data || !data.environments) {
      return [];
    }

    return data.environments.map(({ name }) => {
      return {
        text: name,
        onClick: () => {
          setIsMenuOpen(false);
          onSelect(name);
        },
      };
    });
  }, [data]);

  useClickAway(menuWrapperRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <div ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
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
              ref={refs.setFloating}
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
