import React, { useState, memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import { Text, Icon } from "../../atoms";
import { Container, Button, Slider } from "./styles";

type Item = {
  text?: string;
  icon?: string;
  id: string;
};

export interface SegmentProps extends SpaceProps {
  /**
   * List of items
   */
  items: Array<Item>;
  /**
   * Selected item
   */
  onSelect: (selected: string) => void;
}

const Segment = ({ items, onSelect, ...props }: SegmentProps) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  return (
    <Container data-testid="segment-component" {...props}>
      {items.map((item: Item, index: number) => {
        const buttonProps = selected === index ? { className: "active" } : {};
        return (
          <Button
            data-testid="segment-button"
            {...buttonProps}
            key={index.toString()}
            onClick={() => {
              setTranslateX(index * 100);
              onSelect(item.id);
              setSelected(index);
            }}
          >
            {!!item.icon && (
              <Icon icon={item.icon} color={theme.colors.black} />
            )}
            {!!item.text && (
              <Text size="small" ml={!!item.icon ? theme.spacing.s1 : 0}>
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

export default memo(Segment);
