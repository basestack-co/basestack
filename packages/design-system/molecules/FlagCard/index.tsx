import React, { memo, forwardRef } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { IconButton, Text } from "../../atoms";
import { Labels, StyledCard, StyledLabel } from "./styles";

export interface FlagCardProps extends SpaceProps {
  /**
   * Card title
   */
  title: string;
  /**
   * Callback for more button
   */
  onClickMore: () => void;
  /**
   * Card title
   */
  description: string;
  /**
   * Card title
   */
  date: string;
  /**
   * Environments where flag is created
   */
  environments: Array<{
    text: string;
    isFlagOn: boolean;
  }>;
}

const FlagCard = forwardRef<HTMLDivElement, FlagCardProps>(
  ({ title, description, environments, date, onClickMore, ...props }, ref) => {
    const theme = useTheme();

    return (
      <StyledCard ref={ref} testId="flag-card" p={theme.spacing.s5}>
        <Text data-testid="flag-title" size="large" mb={theme.spacing.s2}>
          {title}
        </Text>
        <Text data-testid="flag-description" size="small" mb={theme.spacing.s3}>
          {description}
        </Text>
        <Labels data-testid="flag-labels">
          {environments.map((environment, index) => {
            return (
              !!environment.text && (
                <StyledLabel
                  key={index.toString()}
                  testId={`${environment.text}-flag-label`}
                  text={environment.text}
                  variant={environment.isFlagOn ? "success" : "default"}
                />
              )
            );
          })}
        </Labels>
        <Text data-testid="flag-date" mt="auto" size="small" muted>
          {date}
        </Text>
        <IconButton
          position="absolute"
          top="14px"
          right="14px"
          icon="more_horiz"
          onClick={onClickMore}
        />
      </StyledCard>
    );
  }
);

FlagCard.displayName = "FlagCard";

export default memo(FlagCard);
