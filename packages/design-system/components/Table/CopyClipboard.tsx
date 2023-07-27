import React, { useEffect, useState } from "react";
// Components
import IconButton from "../IconButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

const CopyClipboard = ({ text }: { text: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  return (
    <Tooltip open={showTooltip} placement="top">
      <TooltipTrigger>
        <IconButton
          variant="neutral"
          icon="content_copy"
          onClick={() => {
            navigator.clipboard.writeText(text);
            setShowTooltip(true);
          }}
        />
      </TooltipTrigger>
      <TooltipContent>{`${text} copied to clipboard`}</TooltipContent>
    </Tooltip>
  );
};

export default CopyClipboard;
