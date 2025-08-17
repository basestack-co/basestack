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
  };
  sort?: {
    text: string;
    items: PopupProps["items"];
  };
  primaryAction: {
    onClick: () => void;
    text: string;
    icon: string;
  };
  secondaryAction?: {
    onClick: () => void;
    text: string;
    icon: string;
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
  const { device } = useTheme();
  const isTablet = useMedia(device.max.lg, false);
  const isMobile = useMedia(device.max.md, false);

  return (
    <Container>
      <Column>
        <Search {...search} maxWidth="300px" size="small" />

        {filter && (
          <PopupMenu
            iconButton={{ icon: "page_info", variant: "secondary" }}
            button={{
              variant: ButtonVariant.Tertiary,
              text: isTablet ? "" : filter.text,
              icon: "page_info",
            }}
            items={filter.items}
            iconPlacement="left"
            dropdownPlacement="bottom-start"
          />
        )}

        {sort && (
          <PopupMenu
            iconButton={{ icon: "sort", variant: "secondary" }}
            button={{
              variant: ButtonVariant.Tertiary,
              text: isTablet ? "" : sort.text,
              icon: "sort",
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
              />
            ) : (
              <Button
                icon={secondaryAction.icon}
                onClick={secondaryAction.onClick}
                iconPlacement="left"
                variant={ButtonVariant.Tertiary}
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
          >
            {primaryAction.text}
          </Button>
        )}
      </Column>
    </Container>
  );
};

export default Toolbar;
