import { memo, useState } from "react";
import type { LayoutProps, SpaceProps } from "styled-system";
import IconButton from "../IconButton";
// Components
import Text from "../Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import {
  Container,
  DescriptionContainer,
  IconButtonContainer,
  TitleContainer,
} from "./styles";

export interface CopyCardProps extends LayoutProps, SpaceProps {
  title?: string;
  description: string;
  tooltip: {
    defaultText: string;
    successText: string;
  };
}

const CopyCard = ({ title, description, tooltip, ...props }: CopyCardProps) => {
  const [showTooltipSuccess, setShowTooltipSuccess] = useState(false);

  return (
    <Container {...props}>
      <TitleContainer>
        <Text>{title}</Text>
      </TitleContainer>
      <DescriptionContainer>
        <Text lineTruncate>{description}</Text>
      </DescriptionContainer>
      <IconButtonContainer>
        <Tooltip placement="top">
          <TooltipTrigger onMouseLeave={() => setShowTooltipSuccess(false)}>
            <IconButton
              variant="neutral"
              icon="content_copy"
              onClick={async () => {
                await navigator.clipboard.writeText(description);
                setShowTooltipSuccess(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            {showTooltipSuccess ? tooltip.successText : tooltip.defaultText}
          </TooltipContent>
        </Tooltip>
      </IconButtonContainer>
    </Container>
  );
};

export default memo(CopyCard);
