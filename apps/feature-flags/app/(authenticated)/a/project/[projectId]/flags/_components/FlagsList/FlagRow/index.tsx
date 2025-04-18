import React, { memo, forwardRef } from "react";
import { useTheme } from "styled-components";
import { animated } from "react-spring";
// Hooks
import { useFloatingPopup } from "@basestack/hooks";
// Server
import { api } from "utils/trpc/react";
// Components
import {
  Text,
  IconButton,
  Card,
  Popup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Skeleton,
} from "@basestack/design-system";
import TooltipIcon from "components/TooltipIcon";
// Styles
import {
  Labels,
  Label,
  CardWrapper,
  PopupWrapper,
  TooltipContainer,
  IconsContainer,
} from "./styles";
import { FlagRowProps } from "./types";

const AnimatedPopup = animated(Popup);

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

    const {
      popupWrapperRef,
      x,
      y,
      refs,
      strategy,
      transition,
      getReferenceProps,
      getFloatingProps,
      onClickMore,
      onCloseMenu,
    } = useFloatingPopup({});

    const { data } = api.flag.environments.useQuery(
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
          <PopupWrapper ref={popupWrapperRef}>
            <IconButton
              {...getReferenceProps}
              size="medium"
              ref={refs.setReference}
              icon="more_horiz"
              onClick={onClickMore}
            />
            {transition(
              (styles, item) =>
                item &&
                popupItems.length > 0 && (
                  <AnimatedPopup
                    {...getFloatingProps}
                    ref={refs.setFloating}
                    style={styles}
                    position={strategy}
                    top={y}
                    left={x}
                    items={popupItems}
                    onClickList={onCloseMenu}
                  />
                ),
            )}
          </PopupWrapper>
        </CardWrapper>
      </Card>
    );
  },
);

FlagRow.displayName = "FlagRow";

export default memo(FlagRow);
