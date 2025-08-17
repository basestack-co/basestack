import React, { Fragment } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
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
  PopupMenu,
  type PopupMenuProps,
} from "@basestack/design-system";

type Variant = "success" | "warning" | "danger" | "default";

export interface MonitorCardProps {
  menuItems: PopupMenuProps["items"];
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
  onClick: () => void;
}

const MonitorCard = ({
  title,
  labels,
  data,
  icons,
  menuItems,
  onClick,
}: MonitorCardProps) => {
  const { colors, spacing, isDarkMode } = useTheme();

  const getColorVariant = (variant?: Variant) => {
    const colorsVariant = {
      success: isDarkMode ? colors.green300 : colors.green400,
      warning: isDarkMode ? colors.orange300 : colors.orange400,
      danger: isDarkMode ? colors.red300 : colors.red400,
      default: isDarkMode ? colors.gray300 : colors.black,
    };

    return colorsVariant[variant ?? "default"];
  };

  return (
    <Card position="relative" hasHoverAnimation>
      {menuItems && (
        <Box position="absolute" right={rem("14px")} top={rem("14px")}>
          <PopupMenu items={menuItems} />
        </Box>
      )}
      <Box
        role="button"
        onClick={onClick}
        backgroundColor="transparent"
        border="none"
        cursor="pointer"
      >
        <Box p={spacing.s5}>
          <Text textAlign="left" fontWeight={500}>
            {title}
          </Text>

          <Flex flexWrap="wrap" alignItems="center" gap={spacing.s1}>
            {labels?.map(({ text, label }, index, { length }) => (
              <Fragment key={`label-${index}`}>
                {label ? (
                  <Text textAlign="left" flexShrink={0} muted>
                    {text} <Text as="span">{label}</Text>
                  </Text>
                ) : (
                  <Text textAlign="left" flexShrink={0} muted>
                    {text}
                  </Text>
                )}
                {index + 1 !== length && (
                  <Text textAlign="left" flexShrink={0} muted size="xSmall">
                    •
                  </Text>
                )}
              </Fragment>
            ))}
          </Flex>

          <Box mt={spacing.s5}>
            <Flex gap={spacing.s2} flexWrap="wrap">
              {data?.map(({ text, label, variant }, index) => (
                <Flex key={`data-${index}`} flexDirection="column" flex="1 0 0">
                  <Text textAlign="left" muted size="xSmall">
                    {label.toUpperCase()}
                  </Text>
                  <Text
                    textAlign="left"
                    size="medium"
                    color={getColorVariant(variant)}
                  >
                    {text}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>

        {icons?.length > 0 && (
          <>
            <HorizontalRule mt="auto" />

            <Box py={spacing.s3} px={spacing.s5}>
              <Flex alignItems="center" gap={spacing.s4} flexWrap="wrap">
                {icons?.map(({ icon, text, tooltip, variant }, index) => (
                  <Tooltip key={`icon-${index}`} placement="top">
                    <TooltipTrigger>
                      <Flex alignItems="center">
                        <Icon icon={icon} size="small" />
                        <Label
                          text={text}
                          ml={spacing.s1}
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
      </Box>
    </Card>
  );
};

export default MonitorCard;
