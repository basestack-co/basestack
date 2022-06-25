import React, { memo, useCallback, useState } from "react";
import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { useTheme } from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { Button } from "../../../atoms";
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

  return (
    <>
      <Button
        ref={reference}
        iconPlacement="right"
        icon={isMenuOpen ? "expand_less" : "expand_more"}
        variant="tertiary"
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
    </>
  );
};

export default memo(EnvironmentsMenu);
