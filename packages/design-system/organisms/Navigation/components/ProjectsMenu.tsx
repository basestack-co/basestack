import React, { memo, useCallback, useState } from "react";
import { useTransition, animated, config } from "react-spring";
import { useFloating, autoUpdate, offset } from "@floating-ui/react-dom";
import { Button } from "../../../atoms";
import { scaleInTopLeft } from "../../../animations/springs";
import { PopupActions } from "../../../molecules";

const AnimatedProjectsPopup = animated(PopupActions);

const ProjectsMenu = () => {
  const [isProjectsPopupOpen, setIsProjectsPopupOpen] = useState(false);
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(4)],
  });

  const onClickProjects = useCallback(() => {
    setIsProjectsPopupOpen((prevState) => !prevState);
  }, []);

  const transitionProjectsPopup = useTransition(isProjectsPopupOpen, {
    config: { ...config.default, duration: 150 },
    ...scaleInTopLeft,
  });

  return (
    <>
      <Button
        ref={reference}
        iconPlacement="right"
        icon={isProjectsPopupOpen ? "expand_less" : "expand_more"}
        variant="primaryNeutral"
        onClick={onClickProjects}
      >
        Project Name
      </Button>
      {transitionProjectsPopup(
        (styles, item) =>
          item && (
            <AnimatedProjectsPopup
              style={styles}
              ref={floating}
              position={strategy}
              top={y}
              left={x}
              title="Projects"
              items={[
                {
                  text: "Moon flags",
                  onClick: () => console.log("clicked"),
                  logo: "",
                },
                {
                  text: "Teams kids",
                  onClick: () => console.log("clicked"),
                  logo: "",
                },
              ]}
              button={{
                text: "Create Project",
                onClick: () => console.log("clicked"),
              }}
            />
          )
      )}
    </>
  );
};

export default memo(ProjectsMenu);
