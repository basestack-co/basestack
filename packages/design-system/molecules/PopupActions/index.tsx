import { forwardRef, memo } from "react";
import { PositionProps } from "styled-system";
import { Avatar, Button, ButtonVariant, Text } from "../../atoms";
import { Container, Header, List, ListItem, ProjectButton } from "./styles";
import { useTheme } from "styled-components";

export interface PopupItem {
  id: string;
  onClick: (id: string) => void;
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
  items: Array<PopupItem>;
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
                  <ProjectButton
                    onClick={() => item.onClick(item.id)}
                    key={`project-button-${index}`}
                  >
                    <Avatar
                      round={false}
                      userName={item.text}
                      alt={`Select ${item.text} from the projects list`}
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
