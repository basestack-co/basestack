import React, { memo, forwardRef } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Text, IconButton } from "../../atoms";
import { Labels, StyledCard, Label, CardWrapper } from "./styles";

export interface FlagRowProps extends SpaceProps {
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

const FlagRow = forwardRef<HTMLDivElement, FlagRowProps>(
  ({ title, description, environments, date, onClickMore, ...props }, ref) => {
    const theme = useTheme();

    return (
      <StyledCard ref={ref} testId="flag-card" p={theme.spacing.s5}>
        <CardWrapper>
          <Labels data-testid="flag-labels">
            {environments.map((environment, index, { length }) => {
              return (
                <Label
                  key={index.toString()}
                  index={index}
                  length={length}
                  data-testid={`${environment.text}-flag-label`}
                  isActive={environment.isFlagOn}
                />
              );
            })}
          </Labels>
          <Text data-testid="flag-title" size="large">
            {title}
          </Text>
          <Text data-testid="flag-description" size="small">
            {description}
          </Text>
          <Text data-testid="flag-date" size="small" muted>
            {date}
          </Text>
          <IconButton icon="more_horiz" onClick={onClickMore} />
        </CardWrapper>
      </StyledCard>
    );
  }
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);
