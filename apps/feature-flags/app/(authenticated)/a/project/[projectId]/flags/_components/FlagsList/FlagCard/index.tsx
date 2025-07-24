import {
  Card,
  Label,
  PopupMenu,
  Skeleton,
  Text,
} from "@basestack/design-system";
import { TooltipIcon } from "@basestack/ui";
import React, { forwardRef, memo } from "react";
import { useTheme } from "styled-components";
import { api } from "utils/trpc/react";
import { DropdownWrapper, Footer, Labels, LoadingContainer } from "./styles";
import { FlagCardProps } from "./types";

const FlagCard = forwardRef<HTMLDivElement, FlagCardProps>(
  (
    {
      projectId,
      title,
      slug,
      description,
      date,
      popupItems,
      hasPayload = false,
      isExpired = false,
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
        p={theme.spacing.s5}
        position="relative"
        {...props}
      >
        <div>
          <Text
            data-testid="flag-title"
            size="large"
            mb={theme.spacing.s2}
            pr={theme.spacing.s7}
            lineTruncate
          >
            {title}
          </Text>
        </div>
        <Text data-testid="flag-description" size="small" mb={theme.spacing.s3}>
          {description}
        </Text>
        {!data?.environments && (
          <LoadingContainer>
            <Skeleton
              displayInline
              items={[
                { h: 24, w: "20%", mr: 4 },
                { h: 24, w: "25%", mr: 4 },
                { h: 24, w: "20%" },
              ]}
              hasShadow={false}
              padding={0}
            />
          </LoadingContainer>
        )}
        {!!data?.environments && (
          <Labels data-testid="flag-labels">
            {data?.environments
              .filter((item) => !!item.name)
              .map((environment) => (
                <Label
                  key={environment.id}
                  testId={`${environment.name}-flag-label`}
                  text={environment.name}
                  variant={environment.enabled ? "success" : "default"}
                />
              ))}
          </Labels>
        )}
        <Footer>
          <Text data-testid="flag-date" mt="auto" size="small" muted mr="auto">
            {date}
          </Text>
          {hasPayload && (
            <TooltipIcon
              ml={theme.spacing.s2}
              icon="data_object"
              text="Payload"
            />
          )}
          {isExpired && (
            <TooltipIcon
              ml={theme.spacing.s2}
              icon="timer_off"
              text="Expired"
            />
          )}
        </Footer>
        {popupItems && (
          <DropdownWrapper>
            <PopupMenu items={popupItems} />
          </DropdownWrapper>
        )}
      </Card>
    );
  },
);

FlagCard.displayName = "FlagCard";

export default memo(FlagCard);
