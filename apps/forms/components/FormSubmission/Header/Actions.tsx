import React from "react";
// Locales
import useTranslation from "next-translate/useTranslation";
// Components
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
  onMarkSpam: (value: boolean) => void;
  onReadSubmission: (value: boolean) => void;
  isVisible: boolean;
  onDestroyed: () => void;
  viewed?: boolean;
  isSpam?: boolean;
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
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        icon={icon}
        variant="secondary"
      />
    );
  }

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
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

const Actions = ({
  onDelete,
  onMarkSpam,
  onReadSubmission,
  isVisible,
  onDestroyed,
  viewed,
  isSpam,
}: ActionsProps) => {
  const { t } = useTranslation("forms");
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
            <ActionButton
              onClick={onDelete}
              icon="delete"
              text={t("submission.action.delete")}
            />
          </ActionsListItem>
          <ActionsListItem>
            <ActionButton
              onClick={() => onMarkSpam(!isSpam)}
              icon="report"
              text={
                isSpam
                  ? t("submission.action.unmark-spam")
                  : t("submission.action.mark-spam")
              }
            />
          </ActionsListItem>
          <ActionsListItem>
            <ActionButton
              onClick={() => onReadSubmission(!viewed)}
              icon="mark_email_read"
              text={
                viewed
                  ? t("submission.action.un-read-submission")
                  : t("submission.action.read-submission")
              }
            />
          </ActionsListItem>
        </AnimatedBList>
      ),
  );
};

export default Actions;
