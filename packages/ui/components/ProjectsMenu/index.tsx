import {
  Avatar,
  Button,
  ButtonVariant,
  slideBottom,
} from "@basestack/design-system";
// Components
import { autoUpdate, offset, useFloating } from "@floating-ui/react";
import { rem } from "polished";
import React, { memo, useCallback, useRef, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import { useClickAway } from "react-use";
import { useTheme } from "styled-components";
import PopupActions, { PopupActionProps } from "../PopupActions";
// Types
import { ListItem } from "./styles";

export interface ProjectsMenuProps {
  current: string;
  data: Array<{ title: string; items: PopupActionProps[] }>;
  onCreate: () => void;
  select: {
    title: string;
    create: string;
  };
}

const AnimatedProjectsPopup: any = animated(PopupActions);

const ProjectsMenu = ({
  data,
  current,
  onCreate,
  select,
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
        isDisabled={!data?.length}
        pr={rem("8px")}
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
              data={data}
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
