import { Fragment } from "react";
import { useTheme } from "styled-components";
import { rem } from "polished";
import {
  Box,
  Button,
  ButtonVariant,
  Flex,
  PopupMenu,
  PopupMenuProps,
  Text,
  Label,
  LabelProps,
  Icon,
} from "@basestack/design-system";

export interface DetailsHeaderProps {
  title: string;
  hasBullets?: boolean;
  details: Array<{
    text: string;
    type?: "text" | "label";
    labelVariant?: LabelProps["variant"];
    icon?: string;
  }>;
  button: {
    text: string;
    onClick: () => void;
    variant?: ButtonVariant;
  };
  popup: {
    text: string;
    items: PopupMenuProps["items"];
  };
}

const DetailsHeader = ({
  title,
  details,
  button,
  popup,
  hasBullets = true,
}: DetailsHeaderProps) => {
  const { spacing } = useTheme();

  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      gap={spacing.s5}
      justifyContent="space-between"
    >
      <Box>
        <Text size="large" mb={spacing.s1}>
          {title}
        </Text>
        <Flex
          alignItems="center"
          columnGap={hasBullets ? spacing.s2 : spacing.s4}
          flexWrap="wrap"
        >
          {details.map((detail, index, { length }) => (
            <Fragment key={index}>
              {detail.type === "label" ? (
                <Label
                  size="small"
                  text={detail.text}
                  variant={detail.labelVariant}
                  isTranslucent
                />
              ) : (
                <Flex alignItems="center" gap={rem("6px")}>
                  {!hasBullets && detail.icon && (
                    <Icon icon={detail.icon} size="small" muted />
                  )}
                  <Text size="small" muted>
                    {detail.text}
                  </Text>
                </Flex>
              )}
              {hasBullets && index + 1 !== length && (
                <Text size="small" muted>
                  •
                </Text>
              )}
            </Fragment>
          ))}
        </Flex>
      </Box>

      <Flex alignItems="center" gap={spacing.s3}>
        <Button
          variant={button.variant || ButtonVariant.Outlined}
          onClick={button.onClick}
        >
          {button.text}
        </Button>
        <PopupMenu
          items={popup.items}
          button={{ text: popup.text, variant: ButtonVariant.Primary }}
        />
      </Flex>
    </Flex>
  );
};

export default DetailsHeader;
