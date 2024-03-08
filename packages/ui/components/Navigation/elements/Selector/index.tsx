import React, { memo, useCallback, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { animated, config, useTransition } from "react-spring";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import {
  Button,
  ButtonVariant,
  PopupActions,
  PopupActionProps,
  slideBottom,
} from "@basestack/design-system";
// Locales
import useTranslation from "next-translate/useTranslation";
// Types
import { ListItem } from "./styles";

export interface ProjectsMenuProps {
  currentProject: string;
  projects: Array<PopupActionProps>;
  onClickCreateProject: () => void;
}

const AnimatedProjectsPopup = animated(PopupActions);

const ProjectsMenu = ({
  projects,
  currentProject,
  onClickCreateProject,
}: ProjectsMenuProps) => {
  const { t } = useTranslation("navigation");
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
    ...slideBottom,
  });

  useClickAway(menuWrapperRef, () => {
    setIsProjectsPopupOpen(false);
  });

  const onClickCreate = useCallback(() => {
    setIsProjectsPopupOpen(false);
    onClickCreateProject();
  }, [onClickCreateProject]);

  const truncateText = (str: string) => {
    return str.length <= 18 ? str : str.slice(0, 18) + "...";
  };

  return (
    <ListItem ref={menuWrapperRef}>
      <Button
        ref={refs.setReference}
        iconPlacement="right"
        icon={isProjectsPopupOpen ? "arrow_drop_up" : "arrow_drop_down"}
        variant={ButtonVariant.PrimaryNeutral}
        onClick={onClickProjects}
      >
        {!!currentProject ? truncateText(currentProject) : t("forms.select")}
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
              title={t("forms.title")}
              items={projects}
              onCallback={onClickProjects}
              button={{
                text: t("create.form"),
                onClick: onClickCreate,
              }}
            />
          ),
      )}
    </ListItem>
  );
};

export default memo(ProjectsMenu);
