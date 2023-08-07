import { forwardRef, memo, useCallback } from "react";
import { PositionProps } from "styled-system";
import Text from "../Text";
import Avatar from "../Avatar";
import { Button, ButtonVariant } from "../Button";
import { Container, Header, List, ListItem, PopUpButton } from "./styles";
import { useTheme } from "styled-components";

export interface PopupActionProps {
  id: string;
  slug: string;
  onClick: () => void;
  text: string;
}

export interface PopupActionsProps extends PositionProps {
  /**
   * Popup title
   */
  title: string;
  /**
   * List of actions
   */
  items: Array<PopupActionProps>;
  /**
   * Button props
   */
  button: {
    text: string;
    onClick: () => void;
  };
  onCallback?: () => void;
  /**
   * Truncates list item text to one line
   */
  truncateText?: boolean;
}

const PopupActions = forwardRef<HTMLDivElement, PopupActionsProps>(
  (
    { items, button, title, onCallback, truncateText = true, ...props },
    ref,
  ) => {
    const theme = useTheme();

    const onHandleClick = useCallback(
      (onClick: () => void) => {
        onClick();

        if (typeof onCallback === "function") {
          onCallback();
        }
      },
      [onCallback],
    );

    return (
      <Container ref={ref} {...props}>
        <Header>
          <Text muted fontWeight={500}>
            {title}
          </Text>
        </Header>
        {items && (
          <List>
            {items.map((item, index) => {
              return (
                <ListItem key={`pop-up-button-${item.id}`}>
                  <PopUpButton onClick={() => onHandleClick(item.onClick)}>
                    <Avatar
                      round={false}
                      userName={item.text}
                      alt={`Select ${item.text} from the list`}
                      size="xSmall"
                    />
                    <Text ml={theme.spacing.s2} lineTruncate={truncateText}>
                      {item.text}
                    </Text>
                  </PopUpButton>
                </ListItem>
              );
            })}
          </List>
        )}
        <Button
          mt={theme.spacing.s1}
          justifyContent="center"
          variant={ButtonVariant.Tertiary}
          fullWidth
          onClick={button.onClick}
        >
          {button.text}
        </Button>
      </Container>
    );
  },
);

PopupActions.displayName = "PopupActions";

export default memo(PopupActions);
