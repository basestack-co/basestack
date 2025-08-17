import React from "react";
import { useTheme } from "styled-components";
import {
  Button,
  PopupMenu,
  type PopupProps,
  Search,
  SearchProps,
  Segment,
  SegmentProps,
  IconButton,
  ButtonVariant,
} from "@basestack/design-system";
import { useMedia } from "react-use";
import { Column, Container } from "./styles";

export interface ToolbarProps {
  search: SearchProps;
  filter?: {
    text: string;
    items: PopupProps["items"];
    isDisabled?: boolean;
  };
  sort?: {
    text: string;
    items: PopupProps["items"];
    isDisabled?: boolean;
  };
  primaryAction: {
    onClick: () => void;
    text: string;
    icon: string;
    isDisabled?: boolean;
  };
  secondaryAction?: {
    onClick: () => void;
    text: string;
    icon: string;
    isDisabled?: boolean;
  };
  popup?: {
    isDisabled?: boolean;
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
  const { device } = useTheme();
  const isTablet = useMedia(device.max.lg, false);
  const isMobile = useMedia(device.max.md, false);

  return (
    <Container>
      <Column>
        <Search {...search} maxWidth="300px" size="small" />

        {filter && (
          <PopupMenu
            iconButton={{
              icon: "page_info",
              variant: "secondary",
              isDisabled: filter.isDisabled,
            }}
            button={{
              variant: ButtonVariant.Tertiary,
              text: isTablet ? "" : filter.text,
              icon: "page_info",
              isDisabled: filter.isDisabled,
            }}
            items={filter.items}
            iconPlacement="left"
            dropdownPlacement="bottom-start"
          />
        )}

        {sort && (
          <PopupMenu
            iconButton={{
              icon: "sort",
              variant: "secondary",
              isDisabled: sort.isDisabled,
            }}
            button={{
              variant: ButtonVariant.Tertiary,
              text: isTablet ? "" : sort.text,
              icon: "sort",
              isDisabled: sort.isDisabled,
            }}
            items={sort.items}
            iconPlacement="left"
            dropdownPlacement="bottom-start"
          />
        )}
      </Column>

      <Column>
        {segment && <Segment {...segment} />}

        {secondaryAction && (
          <>
            {isTablet ? (
              <IconButton
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
                variant="secondary"
                isDisabled={secondaryAction.isDisabled}
              />
            ) : (
              <Button
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
                iconPlacement="left"
                variant={ButtonVariant.Tertiary}
                isDisabled={secondaryAction.isDisabled}
              >
                {secondaryAction.text}
              </Button>
            )}
          </>
        )}

        {popup && (
          <PopupMenu
            button={{
              variant: ButtonVariant.Tertiary,
              text: popup.text,
              isDisabled: popup.isDisabled,
            }}
            items={popup.items}
            dropdownPlacement={isMobile ? "bottom-start" : "bottom-end"}
            iconPlacement="right"
          />
        )}

        {primaryAction && (
          <Button
            iconPlacement="left"
            variant={ButtonVariant.Primary}
            flexShrink={0}
            isDisabled={primaryAction.isDisabled}
          >
            {primaryAction.text}
          </Button>
        )}
      </Column>
    </Container>
  );
};

export default Toolbar;
