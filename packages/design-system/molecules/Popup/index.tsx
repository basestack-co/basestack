import { forwardRef, memo } from "react";
import { PositionProps } from "styled-system";
import { Button, ButtonProps, ButtonVariant } from "../../atoms";
import { Container, List, ListItem } from "./styles";

export interface PopupItems {
  /**
   * onClick list item callback
   */
  onClick: () => void;
  /**
   * List item text
   */
  text: string;
  /**
   * Optional List item icon
   */
  icon?: string;
  /**
   * Change list item button styles based on variant
   */
  variant?: ButtonVariant;
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
              const iconProps = !!item.icon
                ? {
                    icon: item.icon,
                    iconPlacement: "left",
                    iconSize: "small",
                  }
                : {};
              return (
                <Button
                  key={index.toString()}
                  {...(iconProps as ButtonProps)}
                  onClick={item.onClick}
                  fontWeight={400}
                  variant={item.variant || ButtonVariant.Neutral}
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
