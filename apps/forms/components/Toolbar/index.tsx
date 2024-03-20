import React, { useState } from "react";
import { Button, ButtonVariant, Input } from "@basestack/design-system";
import { LeftContent, Container, Wrapper, RightList, ListItem } from "./styles";
import { ButtonSharedProps, ToolbarProps } from "./types";
import PopupMenu from "./PopupMenu";

const Toolbar = ({
  onSelectAll,
  onDeleteAll,
  onMarkSpamAll,
  onUnMarkSpamAll,
  onReadSubmissions,
  onUnReadSubmissions,
  onExport,
}: ToolbarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const buttonProps = {
    variant: ButtonVariant.Tertiary,
    iconPlacement: "left",
  } as ButtonSharedProps;

  return (
    <Container>
      <Wrapper>
        <LeftContent>
          <Input
            testId="search-input"
            size="small"
            width="100%"
            isDarker
            icon="search"
            iconPlacement="left"
            placeholder="Search submissions"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            name="search"
            value={searchValue}
          />
        </LeftContent>
        <RightList>
          <ListItem>
            <Button
              {...buttonProps}
              icon="check_box_outline_blank"
              onClick={onSelectAll}
              flexShrink={0}
            >
              Select all
            </Button>
          </ListItem>
          <PopupMenu
            width={200}
            icon="arrow_drop_down"
            text="Actions"
            items={[
              { icon: "report", text: "Mark as Spam", onClick: onMarkSpamAll },
              {
                icon: "report_off",
                text: "Unmark Spam",
                onClick: onUnMarkSpamAll,
              },
              {
                icon: "mark_email_read",
                text: "Read Submissions",
                onClick: onReadSubmissions,
              },
              {
                icon: "mark_email_unread",
                text: "Un-Read Submissions",
                onClick: onUnReadSubmissions,
              },
              {
                icon: "delete",
                variant: ButtonVariant.Danger,
                text: "Delete all",
                onClick: onDeleteAll,
              },
            ]}
          />
          <PopupMenu
            icon="filter_list"
            text="Filters"
            items={[
              { text: "Recent", onClick: () => null },
              { text: "Last month", onClick: () => null },
              { text: "Deleted", onClick: () => null },
            ]}
          />
          <PopupMenu
            icon="swap_vert"
            text="Sort"
            items={[
              { text: "Spam first", onClick: () => null },
              { text: "Read first", onClick: () => null },
              { text: "Un-Read first", onClick: () => null },
            ]}
          />
          <ListItem>
            <Button {...buttonProps} icon="download" onClick={onExport}>
              Export
            </Button>
          </ListItem>
        </RightList>
      </Wrapper>
    </Container>
  );
};

export default Toolbar;
