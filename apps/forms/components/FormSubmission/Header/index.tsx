import React, { useState } from "react";
import { Text, Icon, Checkbox, Label } from "@basestack/design-system";
import { Box, HeaderButton, HeaderCell, HeaderRight } from "../styles";
import Grid from "./Grid";
import Actions from "./Actions";
import { FormSubmissionHeaderProps } from "../types";

const Header = ({
  isOpen,
  data,
  date,
  onClick,
  checkbox,
}: FormSubmissionHeaderProps) => {
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [isActionsVisible, setIsActionsVisible] = useState(false);

  return (
    <Box display="flex">
      <HeaderCell>
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
          onDelete={() => console.log("")}
          onMarkSpam={() => console.log("")}
          onReadSubmission={() => console.log("")}
        />
        <HeaderRight>
          <Label text="New" variant="info" isTranslucent />
          <Box minWidth={0}>
            <Text fontWeight={400} muted lineTruncate>
              {date}
            </Text>
          </Box>
          <Icon icon={isOpen ? "arrow_drop_up" : "arrow_drop_down"} muted />
        </HeaderRight>
      </HeaderButton>
    </Box>
  );
};

export default Header;
