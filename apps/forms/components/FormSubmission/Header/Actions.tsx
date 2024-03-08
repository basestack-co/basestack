import React from "react";
import { animated, config, useTransition } from "react-spring";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import {
  Button,
  ButtonVariant,
  slideBottom,
  IconButton,
} from "@basestack/design-system";
import { ActionsList, ActionsListItem } from "../styles";

interface ActionsProps {
  onDelete: () => void;
  onMarkSpam: () => void;
  onReadSubmission: () => void;
  isVisible: boolean;
  onDestroyed: () => void;
}

interface ActionButtonProps {
  onClick: () => void;
  icon: string;
  text: string;
}

const AnimatedBList = animated(ActionsList);

const ActionButton = ({ onClick, icon, text }: ActionButtonProps) => {
  const theme = useTheme();
  const isSmallDevice = useMedia(theme.device.max.md, false);

  if (isSmallDevice) {
    return (
      <IconButton
        // @ts-ignore
        onClick={(e) => {
          e?.stopPropagation();
          onClick();
        }}
        icon={icon}
        variant="secondary"
      />
    );
  }

  return (
    <Button
      // @ts-ignore
      onClick={(e) => {
        e?.stopPropagation();
        onClick();
      }}
      iconPlacement="left"
      variant={ButtonVariant.Tertiary}
      icon={icon}
    >
      {text}
    </Button>
  );
};

const Grid = ({
  onDelete,
  onMarkSpam,
  onReadSubmission,
  isVisible,
  onDestroyed,
}: ActionsProps) => {
  const transitionList = useTransition(isVisible, {
    config: { ...config.default, duration: 200 },
    ...slideBottom,
    onDestroyed: (item) => {
      if (item) {
        onDestroyed();
      }
    },
  });

  return transitionList(
    (styles, item) =>
      item && (
        <AnimatedBList style={styles}>
          <ActionsListItem>
            <ActionButton onClick={onDelete} icon="delete" text="Delete" />
          </ActionsListItem>
          <ActionsListItem>
            <ActionButton
              onClick={onMarkSpam}
              icon="report"
              text="Mark as Spam"
            />
          </ActionsListItem>
          <ActionsListItem>
            <ActionButton
              onClick={onReadSubmission}
              icon="mark_email_read"
              text="Read Submission"
            />
          </ActionsListItem>
        </AnimatedBList>
      ),
  );
};

export default Grid;
