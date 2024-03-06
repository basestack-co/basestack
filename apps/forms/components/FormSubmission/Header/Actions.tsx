import React from "react";
import { animated, config, useTransition } from "react-spring";
import {
  Button,
  ButtonVariant,
  ButtonProps,
  slideBottom,
} from "@basestack/design-system";
import { ActionsList, ActionsListItem } from "../styles";

interface ActionsProps {
  onDelete: () => void;
  onMarkSpam: () => void;
  onReadSubmission: () => void;
  isVisible: boolean;
  onDestroyed: () => void;
}

type SharedButtonProps = Pick<ButtonProps, "iconPlacement" | "variant">;

const AnimatedBList = animated(ActionsList);

const Grid = ({
  onDelete,
  onMarkSpam,
  onReadSubmission,
  isVisible,
  onDestroyed,
}: ActionsProps) => {
  const buttonProps: SharedButtonProps = {
    iconPlacement: "left",
    variant: ButtonVariant.Tertiary,
  };

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
            <Button
              {...buttonProps}
              // @ts-ignore
              onClick={(e) => {
                e?.stopPropagation();
                onDelete();
              }}
              icon="delete"
            >
              Delete
            </Button>
          </ActionsListItem>
          <ActionsListItem>
            <Button
              {...buttonProps}
              // @ts-ignore
              onClick={(e) => {
                e?.stopPropagation();
                onMarkSpam();
              }}
              icon="report"
            >
              Mark as Spam
            </Button>
          </ActionsListItem>
          <ActionsListItem>
            <Button
              {...buttonProps}
              // @ts-ignore
              onClick={(e) => {
                e?.stopPropagation();
                onReadSubmission();
              }}
              icon="mark_email_read"
            >
              Read Submission
            </Button>
          </ActionsListItem>
        </AnimatedBList>
      ),
  );
};

export default Grid;
