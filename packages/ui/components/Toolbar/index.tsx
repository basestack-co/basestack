import React from "react";
import { useTheme } from "styled-components";
import {
  Button,
  Flex,
  PopupMenu,
  type PopupProps,
  Search,
  SearchProps,
  Segment,
  SegmentProps,
} from "@basestack/design-system";
import { ButtonVariant } from "@basestack/design-system/components/Button";

export interface ToolbarProps {
  search: SearchProps;
  filter?: {
    text: string;
    items: PopupProps["items"];
  };
  sort?: {
    text: string;
    items: PopupProps["items"];
  };
  primaryAction: {
    onClick: () => void;
    text: string;
    icon?: string;
  };
  secondaryAction?: {
    onClick: () => void;
    text: string;
    icon?: string;
  };
  popup?: {
    text: string;
    items: PopupProps["items"];
  };
  segment?: SegmentProps;
}

const Toolbar = ({
  search,
  filter,
  sort,
  primaryAction,
  popup,
  segment,
  secondaryAction,
}: ToolbarProps) => {
  const { spacing } = useTheme();

  return (
    <Flex gap={spacing.s5} justifyContent="space-between">
      <Flex gap={spacing.s4}>
        <Search {...search} maxWidth="300px" size="small" />

        {filter && (
          <PopupMenu
            button={{
              variant: ButtonVariant.Tertiary,
              text: filter.text,
              icon: "page_info",
            }}
            items={filter.items}
            placement="bottom-start"
          />
        )}

        {sort && (
          <PopupMenu
            button={{
              variant: ButtonVariant.Tertiary,
              text: sort.text,
              icon: "sort",
            }}
            items={sort.items}
            placement="bottom-start"
          />
        )}
      </Flex>

      <Flex gap={spacing.s4}>
        {segment && <Segment {...segment} />}

        {secondaryAction && (
          <Button
            icon={secondaryAction.icon}
            iconPlacement="left"
            variant={ButtonVariant.Tertiary}
          >
            {secondaryAction.text}
          </Button>
        )}

        {popup && (
          <PopupMenu
            button={{
              variant: ButtonVariant.Tertiary,
              text: popup.text,
            }}
            items={popup.items}
          />
        )}

        {primaryAction && (
          <Button
            icon={primaryAction.icon}
            iconPlacement="left"
            variant={ButtonVariant.Primary}
          >
            {primaryAction.text}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Toolbar;
