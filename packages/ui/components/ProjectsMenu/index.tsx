import React, { memo, useCallback, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { useClickAway } from "react-use";
import { animated, config, useTransition } from "react-spring";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import {
  Avatar,
  Button,
  ButtonVariant,
  PopupActions,
  PopupActionProps,
  slideBottom,
} from "@basestack/design-system";
// Types
import { ListItem } from "./styles";

export interface ProjectsMenuProps {
  current: string;
  data: Array<PopupActionProps>;
  onCreate: () => void;
  select: {
    title: string;
    create: string;
  };
  title: string;
}

const AnimatedProjectsPopup = animated(PopupActions);

const ProjectsMenu = ({
  data,
  current,
  onCreate,
  select,
  title,
}: ProjectsMenuProps) => {
  const theme = useTheme();
  const menuWrapperRef = useRef(null);
  const [isProjectsPopupOpen, setIsProjectsPopupOpen] = useState(false);
  const { x, y, refs, strategy } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
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
    onCreate();
  }, [onCreate]);

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
        leftElement={
          !!current ? (
            <Avatar
              userName={current}
              size="xSmall"
              alt={`form ${current}`}
              round={false}
              mr={theme.spacing.s2}
            />
          ) : null
        }
      >
        {!!current ? truncateText(current) : select.title}
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
              title={title}
              items={data}
              onCallback={onClickProjects}
              button={{
                text: select.create,
                onClick: onClickCreate,
              }}
            />
          ),
      )}
    </ListItem>
  );
};

export default memo(ProjectsMenu);
