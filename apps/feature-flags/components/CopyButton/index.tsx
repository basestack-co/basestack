import React, { useState } from "react";
// Locales
import { useTranslations } from "next-intl";
// Components
import {
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";

export interface Props {
  text: string;
}

const CopyButton = ({ text }: Props) => {
    const t = useTranslations("modal");
  const [showTooltipSuccess, setShowTooltipSuccess] = useState(false);

  return (
    <Tooltip placement="top">
      <TooltipTrigger onMouseLeave={() => setShowTooltipSuccess(false)}>
        <IconButton
          icon="content_copy"
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(text);
            setShowTooltipSuccess(true);
          }}
        />
      </TooltipTrigger>
      <TooltipContent>
        {showTooltipSuccess
          ? t("common.copy.code.success")
          : t("common.copy.code.default")}
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyButton;
