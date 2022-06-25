import React, { memo, useCallback, useState } from "react";
import { useFloating, autoUpdate, offset } from "@floating-ui/react-dom";
import { useTransition, animated, config } from "react-spring";
import { Button } from "../../../atoms";
import { Popup } from "../../../molecules";
import { scaleInTopRight } from "../../../animations/springs";

const AnimatedMorePopup = animated(Popup);

const MoreButton = () => {
  const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
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

  return (
    <>
      <Button
        ref={reference}
        iconPlacement="left"
        icon={isMorePopupOpen ? "expand_less" : "expand_more"}
        variant="primaryNeutral"
        onClick={onClickMore}
      >
        Docs
      </Button>
      {transitionMorePopup(
        (styles, item) =>
          item && (
            <AnimatedMorePopup
              style={styles}
              ref={floating}
              position={strategy}
              top={y}
              left={x}
              items={[
                { text: "Documentation", onClick: () => console.log("") },
                { text: "Resources", onClick: () => console.log("") },
                { text: "Github", onClick: () => console.log("") },
              ]}
            />
          )
      )}
    </>
  );
};

export default memo(MoreButton);
