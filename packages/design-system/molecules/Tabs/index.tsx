import React, { useState, memo } from "react";
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
}

const Tabs = ({ items, onSelect, ...props }: TabsProps) => {
  const [translateX, setTranslateX] = useState(0);

  return (
    <Container data-testid="tabs-component" {...props}>
      {items.map((item: Item, index: number) => {
        return (
          <Button
            data-testid="tab-button"
            key={index.toString()}
            onClick={() => {
              setTranslateX(index * 100);
              onSelect(item.text);
            }}
          >
            {!!item.text && (
              <Text fontWeight="500" size="small">
                {item.text}
              </Text>
            )}
          </Button>
        );
      })}
      <Slider translateX={translateX} numberOfItems={items.length} />
    </Container>
  );
};

export default memo(Tabs);
