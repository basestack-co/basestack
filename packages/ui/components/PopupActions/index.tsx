import { forwardRef, memo, useCallback } from "react";
import { PositionProps } from "styled-system";
import { Text, Avatar, Button, ButtonVariant } from "@basestack/design-system";
import {
  Col,
  Container,
  Header,
  List,
  ListItem,
  PopUpButton,
  Wrapper,
} from "./styles";
import { useTheme } from "styled-components";

export interface PopupActionProps {
  id: string;
  slug: string;
  onClick: () => void;
  text: string;
  isActive: boolean;
}

export interface PopupActionsProps extends PositionProps {
  /**
   * List of actions
   */
  data: Array<{ title: string; items: PopupActionProps[] }>;
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
  ({ data, button, onCallback, truncateText = true, ...props }, ref) => {
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
        <Wrapper>
          {data?.map(({ title, items }, index) => (
            <Col key={index}>
              <Header>
                <Text muted>{title}</Text>
              </Header>
              <List>
                {items.map((item) => {
                  return (
                    <ListItem key={`pop-up-button-${item.id}`}>
                      <PopUpButton
                        isActive={item.isActive}
                        disabled={item.isActive}
                        onClick={() => onHandleClick(item.onClick)}
                      >
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
            </Col>
          ))}
        </Wrapper>
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
