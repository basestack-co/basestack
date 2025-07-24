import {
  Card,
  PopupMenu,
  Skeleton,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@basestack/design-system";
import TooltipIcon from "components/TooltipIcon";
import React, { forwardRef, memo } from "react";
import { useTheme } from "styled-components";
import { api } from "utils/trpc/react";
import {
  CardWrapper,
  IconsContainer,
  Label,
  Labels,
  TooltipContainer,
} from "./styles";
import { FlagRowProps } from "./types";

const FlagRow = forwardRef<HTMLDivElement, FlagRowProps>(
  (
    {
      isExpired,
      hasPayload,
      projectId,
      title,
      slug,
      description,
      popupItems = [],
      date,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();

    const { data } = api.projectFlags.environments.useQuery(
      {
        projectId,
        slug,
      },
      {
        enabled: !!projectId,
      },
    );

    return (
      <Card
        ref={ref}
        testId="flag-card"
        hasHoverAnimation
        p={`${theme.spacing.s2} ${theme.spacing.s3}`}
        {...props}
      >
        <CardWrapper>
          <Labels data-testid="flag-labels">
            {!data?.environments && (
              <Skeleton
                displayInline
                items={[
                  { h: 14, w: 14, isRound: true },
                  { h: 14, w: 14, ml: -4, isRound: true },
                  { h: 14, w: 14, ml: -4, isRound: true },
                ]}
                hasShadow={false}
                padding={0}
              />
            )}
            {data?.environments.map((environment, index, { length }) => (
              <TooltipContainer
                key={environment.id}
                index={index}
                length={length}
              >
                <Tooltip placement="top">
                  <TooltipTrigger>
                    <Label
                      data-testid={`${environment.name}-flag-label`}
                      isActive={environment.enabled}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{environment.name}</TooltipContent>
                </Tooltip>
              </TooltipContainer>
            ))}
          </Labels>
          <Text data-testid="flag-title" size="medium" lineTruncate>
            {title}
          </Text>
          <Text data-testid="flag-description" size="small" lineTruncate>
            {!!description ? description : "-"}
          </Text>
          <Text data-testid="flag-date" size="small" muted lineTruncate>
            {date}
          </Text>
          <IconsContainer>
            {hasPayload && <TooltipIcon icon="data_object" text="Payload" />}
            {isExpired && (
              <TooltipIcon
                ml={theme.spacing.s2}
                icon="timer_off"
                text="Expired"
              />
            )}
          </IconsContainer>
          {popupItems && <PopupMenu items={popupItems} />}
        </CardWrapper>
      </Card>
    );
  },
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);
