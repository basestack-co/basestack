import React, { useState } from "react";
// Components
import IconButton from "../IconButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import { tooltip } from "./types";

export interface CopyClipboardProps {
  tooltip: tooltip;
}

const CopyClipboard = ({ tooltip }: CopyClipboardProps) => {
  const [showTooltipSuccess, setShowTooltipSuccess] = useState(false);

  return (
    <Tooltip placement="top">
      <TooltipTrigger onMouseLeave={() => setShowTooltipSuccess(false)}>
        <IconButton
          variant="neutral"
          icon="content_copy"
          onClick={() => {
            navigator.clipboard.writeText(tooltip.textToCopy);
            setShowTooltipSuccess(true);
          }}
        />
      </TooltipTrigger>
      <TooltipContent>
        {showTooltipSuccess ? tooltip.successText : tooltip.defaultText}
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyClipboard;
