import { useState, memo } from "react";
import { SpaceProps } from "styled-system";
import { Text } from "../../atoms";
import { Container, Button, Slider } from "./styles";

type Item = {
  text: string;
};

export interface TabsProps extends SpaceProps {
  /**
   * List of items
   */
  items: Array<Item>;
  /**
   * Selected item
   */
  onSelect: (selected: string) => void;
  /**
   * Change Tabs background
   */
  backgroundColor?: string;
  /**
   * Change slider position, number representing the index of selected item
   */
  sliderPosition?: number;
}

const Tabs = ({
  items,
  onSelect,
  backgroundColor,
  sliderPosition = 0,
  ...props
}: TabsProps) => (
  <Container
    backgroundColor={backgroundColor}
    data-testid="tabs-component"
    {...props}
  >
    {items &&
      items.map((item: Item, index: number) => {
        return (
          <Button
            data-testid="tab-button"
            key={index.toString()}
            onClick={() => onSelect(item.text)}
          >
            {!!item.text && (
              <Text fontWeight="500" size="small">
                {item.text}
              </Text>
            )}
          </Button>
        );
      })}
    <Slider translateX={sliderPosition * 100} numberOfItems={items.length} />
  </Container>
);

export default memo(Tabs);