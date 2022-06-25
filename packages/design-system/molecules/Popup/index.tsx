import { forwardRef, memo } from "react";
import { PositionProps } from "styled-system";
import { Button } from "../../atoms";
import { Container, List, ListItem } from "./styles";

export interface PopupItems {
  onClick: () => void;
  text: string;
}

export interface PopupProps extends PositionProps {
  /**
   * List of actions
   */
  items: Array<PopupItems>;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ items, ...props }, ref) => (
    <Container ref={ref} {...props}>
      <List>
        <ListItem>
          {items &&
            items.map((item, index) => {
              return (
                <Button
                  key={index.toString()}
                  onClick={item.onClick}
                  fontWeight={400}
                  variant="neutral"
                  fullWidth
                >
                  {item.text}
                </Button>
              );
            })}
        </ListItem>
      </List>
    </Container>
  )
);

Popup.displayName = "Popup";

export default memo(Popup);
