import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
import React from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { TooltipContainer } from "./styles";

interface TooltipIconProps extends SpaceProps {
  icon: string;
  text: string;
}

const TooltipIcon = ({ icon, text, ...props }: TooltipIconProps) => {
  const theme = useTheme();

  return (
    <TooltipContainer {...props}>
      <Tooltip placement="top">
        <TooltipTrigger>
          <Icon
            icon={icon}
            color={theme.colors[theme.isDarkMode ? "gray400" : "gray500"]}
            size="small"
          />
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipContainer>
  );
};

export default TooltipIcon;
