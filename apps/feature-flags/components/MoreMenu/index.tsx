import React, { memo, useCallback, useRef, useState } from "react";
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import {
  Button,
  ButtonVariant,
  Popup,
  scaleInTopRight,
} from "@basestack/design-system";
import { ListItem } from "./styles";

const AnimatedMorePopup = animated(Popup);

const MoreButton = () => {
  const menuWrapperRef = useRef(null);
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [offset(4)],
  });

  const onClickMore = useCallback(() => {
    setIsMorePopupOpen((prevState) => !prevState);
  }, []);

  const transitionMorePopup = useTransition(isMorePopupOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopRight,
  });

  useClickAway(menuWrapperRef, () => {
    setIsMorePopupOpen(false);
  });

  return (
    <ListItem ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
        iconPlacement="left"
        icon={isMorePopupOpen ? "expand_less" : "expand_more"}
        variant={ButtonVariant.PrimaryNeutral}
        onClick={onClickMore}
      >
        Docs
      </Button>
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedMorePopup
              style={styles}
              ref={refs.setFloating}
              position={strategy}
              top={y}
              left={x}
              items={[
                { text: "Documentation", onClick: () => console.log("") },
                { text: "Github", onClick: () => console.log("") },
              ]}
            />
          ),
      )}
    </ListItem>
  );
};

export default memo(MoreButton);
