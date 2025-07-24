// Components
import { Checkbox, Icon } from "@basestack/design-system";
import React, { useState } from "react";
// Hooks
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
import Labels from "../Labels";
import {
  Box,
  HeaderButton,
  HeaderCell,
  HeaderRight,
  MobileLabels,
} from "../styles";
import type { FormSubmissionHeaderProps } from "../types";
import Actions from "./Actions";
import Grid from "./Grid";

const Header = ({
  isOpen,
  data,
  date,
  onClick,
  checkbox,
  viewed,
  isSpam,
  onDelete,
  onMarkSpam,
  onReadSubmission,
  isActionsDisabled,
  isMarkSpamLoading,
  isReadSubmissionLoading,
  isDeleteSubmissionLoading,
}: FormSubmissionHeaderProps) => {
  const theme = useTheme();
  const isSmallDevice = useMedia(theme.device.max.sm, false);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [isActionsVisible, setIsActionsVisible] = useState(false);

  return (
    <>
      <Box display="flex">
        <HeaderCell hasBorder>
          <Checkbox {...checkbox} />
        </HeaderCell>
        <HeaderButton
          onClick={onClick}
          aria-label="Open submission"
          role="button"
        >
          <Grid
            data={data}
            isVisible={!isOpen && isGridVisible}
            onDestroyed={() => {
              setIsGridVisible(false);
              setIsActionsVisible(true);
            }}
          />
          <Actions
            isVisible={isOpen && isActionsVisible}
            onDestroyed={() => {
              setIsActionsVisible(false);
              setIsGridVisible(true);
            }}
            onDelete={onDelete}
            onMarkSpam={onMarkSpam}
            onReadSubmission={onReadSubmission}
            viewed={viewed}
            isSpam={isSpam}
            isDisabled={isActionsDisabled}
            isMarkSpamLoading={isMarkSpamLoading}
            isReadSubmissionLoading={isReadSubmissionLoading}
            isDeleteSubmissionLoading={isDeleteSubmissionLoading}
          />
          <HeaderRight>
            {!isSmallDevice && (
              <Labels date={date} viewed={viewed} isSpam={isSpam} />
            )}
            <Icon icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"} muted />
          </HeaderRight>
        </HeaderButton>
      </Box>
      {isSmallDevice && (
        <MobileLabels>
          <Labels date={date} viewed={viewed} isSpam={isSpam} />
        </MobileLabels>
      )}
    </>
  );
};

export default Header;
