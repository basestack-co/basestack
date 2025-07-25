// Components
import {
  IconButton,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
// Locales
import { useTranslations } from "next-intl";
import { useState } from "react";

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
          onClick={async () => {
            await navigator.clipboard.writeText(text);
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
