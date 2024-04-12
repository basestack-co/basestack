import React, { useState } from "react";
// Hooks
import { useMedia } from "react-use";
import { useTheme } from "styled-components";
// Components
import { Icon, Checkbox } from "@basestack/design-system";
import {
  Box,
  HeaderButton,
  HeaderCell,
  HeaderRight,
  MobileLabels,
} from "../styles";
import Grid from "./Grid";
import Actions from "./Actions";
import { FormSubmissionHeaderProps } from "../types";
import Labels from "../Labels";

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
        <HeaderButton onClick={onClick}>
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
