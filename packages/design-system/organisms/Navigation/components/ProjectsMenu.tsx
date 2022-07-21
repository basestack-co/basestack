import React, { memo, useCallback, useRef, useState, useMemo } from "react";
import { useClickAway } from "@basestack/hooks";
import { animated, config, useTransition } from "react-spring";
import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Button, ButtonVariant } from "../../../atoms";
import { scaleInTopLeft } from "../../../animations/springs";
import { PopupActions } from "../../../molecules";
import { PopupItem } from "../../../molecules/PopupActions";
import { ListItem } from "../styles";

export interface ProjectsMenuProps {
  projectId: string;
  projects: Array<PopupItem>;
}

const AnimatedProjectsPopup = animated(PopupActions);

const ProjectsMenu = ({ projects, projectId }: ProjectsMenuProps) => {
  const menuWrapperRef = useRef(null);
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

  useClickAway(menuWrapperRef, () => {
    setIsProjectsPopupOpen(false);
  });

  const currentProject = useMemo(() => {
    const project = projects.find(({ id }) => id === projectId);

    return project?.text ?? "Select project";
  }, [projectId, projects]);

  return (
    <ListItem ref={menuWrapperRef}>
      <Button
        ref={reference}
        iconPlacement="right"
        icon={isProjectsPopupOpen ? "expand_less" : "expand_more"}
        variant={ButtonVariant.PrimaryNeutral}
        onClick={onClickProjects}
      >
        {currentProject}
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
              items={projects}
              button={{
                text: "Create Project",
                onClick: () => console.log("clicked"),
              }}
            />
          )
      )}
    </ListItem>
  );
};

export default memo(ProjectsMenu);
