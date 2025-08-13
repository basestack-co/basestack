import React, { Fragment } from "react";
import { useTheme } from "styled-components";
import {
  Box,
  Card,
  Flex,
  HorizontalRule,
  Icon,
  Text,
  Label,
  LabelProps,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@basestack/design-system";

type Variant = "success" | "warning" | "danger" | "default";

export interface MonitorCardProps {
  title: string;
  labels: Array<{ text: string; label?: string }>;
  data: Array<{
    label: string;
    text: string;
    variant?: Variant;
  }>;
  icons: Array<{
    icon: string;
    text: string;
    tooltip?: string;
    variant?: LabelProps["variant"];
  }>;
}

const MonitorCard = ({ title, labels, data, icons }: MonitorCardProps) => {
  const theme = useTheme();

  const getColorVariant = (variant?: Variant) => {
    const colors = {
      success: theme.colors.green400,
      warning: theme.colors.orange400,
      danger: theme.colors.red400,
      default: theme.colors.black,
    };

    return colors[variant ?? "default"];
  };

  return (
    <Card>
      <Box p={theme.spacing.s5}>
        <Text fontWeight={500}>{title}</Text>

        <Flex flexWrap="wrap" alignItems="center" gap={theme.spacing.s1}>
          {labels?.map(({ text, label }, index, { length }) => (
            <Fragment key={`label-${index}`}>
              {label ? (
                <Text flexShrink={0} muted>
                  {text} <Text as="span">{label}</Text>
                </Text>
              ) : (
                <Text flexShrink={0} muted>
                  {text}
                </Text>
              )}
              {index + 1 !== length && (
                <Text flexShrink={0} muted size="xSmall">
                  •
                </Text>
              )}
            </Fragment>
          ))}
        </Flex>

        <Box mt={theme.spacing.s5}>
          <Flex gap={theme.spacing.s2}>
            {data?.map(({ text, label, variant }, index) => (
              <Flex key={`data-${index}`} flexDirection="column" flex="1 0 0">
                <Text muted size="xSmall">
                  {label.toUpperCase()}
                </Text>
                <Text size="medium" color={getColorVariant(variant)}>
                  {text}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>

      {icons?.length > 0 && (
        <>
          <HorizontalRule />

          <Box py={theme.spacing.s3} px={theme.spacing.s5}>
            <Flex alignItems="center" gap={theme.spacing.s4} flexWrap="wrap">
              {icons?.map(({ icon, text, tooltip, variant }, index) => (
                <Tooltip key={`icon-${index}`} placement="top">
                  <TooltipTrigger>
                    <Flex alignItems="center">
                      <Icon icon={icon} size="small" />
                      <Label
                        text={text}
                        ml={theme.spacing.s1}
                        variant={variant}
                        isTranslucent
                      />
                    </Flex>
                  </TooltipTrigger>
                  <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>
              ))}
            </Flex>
          </Box>
        </>
      )}
    </Card>
  );
};

export default MonitorCard;
