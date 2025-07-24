import { forwardRef, memo } from "react";
import type { PositionProps } from "styled-system";
import { Button, type ButtonProps, ButtonVariant } from "../Button";
import { Container, List, ListItem } from "./styles";

export interface PopupItemsProps {
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
  /**
   * Change the visibility of the item button
   */
  isVisible?: boolean;
  /**
   * Change the disability of the item button
   */
  isDisabled?: boolean;
}

export interface PopupProps extends PositionProps {
  /**
   * Callback onClick the list
   */
  onClickList?: () => void;
  /**
   * List of actions
   */
  items: Array<PopupItemsProps>;
  /**
   * Box width
   */
  width?: number;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>(
  ({ items, width, onClickList, ...props }, ref) => (
    <Container width={width} ref={ref} {...props}>
      <List onClick={onClickList}>
        {items &&
          items.map(({ isVisible = true, ...item }, index) => {
            const iconProps = item.icon
              ? {
                  icon: item.icon,
                  iconPlacement: "left",
                  iconSize: "small",
                }
              : {};
            return isVisible ? (
              <ListItem key={index.toString()}>
                <Button
                  {...(iconProps as ButtonProps)}
                  onClick={item.onClick}
                  fontWeight={400}
                  variant={item.variant || ButtonVariant.Neutral}
                  isDisabled={item.isDisabled}
                  fullWidth
                >
                  {item.text}
                </Button>
              </ListItem>
            ) : null;
          })}
      </List>
    </Container>
  ),
);

Popup.displayName = "Popup";

export default memo(Popup);
