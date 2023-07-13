import React, { memo, useCallback, useRef, useState, useMemo } from "react";
import { useClickAway } from "@basestack/hooks";
import { animated, config, useTransition } from "react-spring";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { Button, ButtonVariant, PopupActions } from "@basestack/design-system";
import { scaleInTopLeft } from "@basestack/design-system/animations/springs";
// Types
import { PopupItem } from "@basestack/design-system/molecules/PopupActions";
import { ListItem } from "../styles";

export interface ProjectsMenuProps {
  currentProject: string;
  projects: Array<PopupItem>;
  onClickCreateProject: () => void;
}

const AnimatedProjectsPopup = animated(PopupActions);

const ProjectsMenu = ({
  projects,
  currentProject,
  onClickCreateProject,
}: ProjectsMenuProps) => {
  const menuWrapperRef = useRef(null);
  const [isProjectsPopupOpen, setIsProjectsPopupOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
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

  const onClickCreate = useCallback(() => {
    setIsProjectsPopupOpen(false);
    onClickCreateProject();
  }, [onClickCreateProject]);

  return (
    <ListItem ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
        iconPlacement="right"
        icon={isProjectsPopupOpen ? "expand_less" : "expand_more"}
        variant={ButtonVariant.PrimaryNeutral}
        onClick={onClickProjects}
      >
        {!!currentProject ? currentProject : "Select Project"}
      </Button>
      {transitionProjectsPopup(
        (styles, item) =>
          item && (
            <AnimatedProjectsPopup
              style={styles}
              ref={refs.setFloating}
              position={strategy}
              top={y}
              left={x}
              title="Projects"
              items={projects}
              onCallback={onClickProjects}
              button={{
                text: "Create Project",
                onClick: onClickCreate,
              }}
            />
          ),
      )}
    </ListItem>
  );
};

export default memo(ProjectsMenu);
