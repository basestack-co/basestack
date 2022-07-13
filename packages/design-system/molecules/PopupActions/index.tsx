import { forwardRef, memo } from "react";
import { PositionProps } from "styled-system";
import { Avatar, Button, ButtonVariant, Text } from "../../atoms";
import { Container, Header, List, ListItem, ProjectButton } from "./styles";
import { useTheme } from "styled-components";

export interface PopupItems {
  onClick: () => void;
  text: string;
  logo: string;
}

export interface PopupActionsProps extends PositionProps {
  /**
   * Popup title
   */
  title: string;
  /**
   * List of actions
   */
  items: Array<PopupItems>;
  /**
   * Button props
   */
  button: {
    text: string;
    onClick: () => void;
  };
}

const PopupActions = forwardRef<HTMLDivElement, PopupActionsProps>(
  ({ items, button, title, ...props }, ref) => {
    const theme = useTheme();

    return (
      <Container ref={ref} {...props}>
        <Header>
          <Text muted fontWeight={500}>
            {title}
          </Text>
        </Header>
        <List>
          <ListItem>
            {items &&
              items.map((item, index) => {
                return (
                  <ProjectButton key={index.toString()}>
                    <Avatar
                      round={false}
                      userName={item.text}
                      alt="logo"
                      size="small"
                    />
                    <Text ml={theme.spacing.s2}>{item.text}</Text>
                  </ProjectButton>
                );
              })}
          </ListItem>
        </List>
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
  }
);

PopupActions.displayName = "PopupActions";

export default memo(PopupActions);
