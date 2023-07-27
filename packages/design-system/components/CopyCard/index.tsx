import React, { memo, useState, useEffect } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
// Components
import Text from "../Text";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";
import IconButton from "../IconButton";
import {
  Container,
  DescriptionContainer,
  IconButtonContainer,
  TitleContainer,
} from "./styles";

export interface CopyCardProps extends LayoutProps, SpaceProps {
  title?: string;
  description: string;
  size?: boolean;
}

const CopyCard = ({ title, description, ...props }: CopyCardProps) => {
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
    <Container {...props}>
      <TitleContainer>
        <Text>{title}</Text>
      </TitleContainer>
      <DescriptionContainer>
        <Text lineTruncate>{description}</Text>
      </DescriptionContainer>
      <IconButtonContainer>
        <Tooltip open={showTooltip} placement="top">
          <TooltipTrigger>
            <IconButton
              variant="neutral"
              icon="content_copy"
              onClick={() => {
                navigator.clipboard.writeText(description);
                setShowTooltip(true);
              }}
            />
          </TooltipTrigger>
          <TooltipContent>{`${description} copied to clipboard`}</TooltipContent>
        </Tooltip>
      </IconButtonContainer>
    </Container>
  );
};

export default memo(CopyCard);
