import {
  Button,
  ButtonVariant,
  IconButton,
  slideBottom,
} from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import React from "react";
// Components
import { animated, config, useTransition } from "react-spring";
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import { ActionsList, ActionsListItem } from "../styles";

interface ActionsProps {
  onDelete: () => void;
  onMarkSpam: (value: boolean) => void;
  onReadSubmission: (value: boolean) => void;
  isVisible: boolean;
  onDestroyed: () => void;
  viewed?: boolean;
  isSpam?: boolean;
  isDisabled?: boolean;
  isMarkSpamLoading?: boolean;
  isReadSubmissionLoading?: boolean;
  isDeleteSubmissionLoading?: boolean;
}

interface ActionButtonProps {
  onClick: () => void;
  icon: string;
  text: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const AnimatedList = animated(ActionsList);

const ActionButton = ({
  onClick,
  icon,
  text,
  isDisabled,
  isLoading,
}: ActionButtonProps) => {
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
      isDisabled={isDisabled}
      isLoading={isLoading}
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
  isDisabled,
  isMarkSpamLoading,
  isReadSubmissionLoading,
  isDeleteSubmissionLoading,
}: ActionsProps) => {
  const t = useTranslations("form");
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
        <AnimatedList style={styles}>
          <ActionsListItem>
            <ActionButton
              isLoading={isDeleteSubmissionLoading}
              isDisabled={isDeleteSubmissionLoading || isDisabled}
              onClick={onDelete}
              icon="delete"
              text={t("submission.action.delete")}
            />
          </ActionsListItem>
          <ActionsListItem>
            <ActionButton
              isLoading={isMarkSpamLoading}
              isDisabled={isMarkSpamLoading || isDisabled}
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
              isLoading={isReadSubmissionLoading}
              isDisabled={isReadSubmissionLoading || isDisabled}
              onClick={() => onReadSubmission(!viewed)}
              icon="mark_email_read"
              text={
                viewed
                  ? t("submission.action.un-read-submission")
                  : t("submission.action.read-submission")
              }
            />
          </ActionsListItem>
        </AnimatedList>
      ),
  );
};

export default Actions;
