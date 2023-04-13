import { memo } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import { Text } from "../../atoms";
import { Size } from "../../atoms/Text/types";
import { Container, Button, Slider } from "./styles";

type Item = {
  id: string;
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
   * Change Tabs borderColor
   */
  borderColor?: string;
  /**
   * Change Tabs hoverBgColor
   */
  hoverBgColor?: string;
  /**
   * Change Tabs background
   */
  backgroundColor?: string;
  /**
   * Change Tab activeBorderColor
   */
  activeBorderColor?: string;
  /**
   * Change Tabs textColor
   */
  textColor?: string;
  /**
   * Change slider position, number representing the index of selected item
   */
  sliderPosition?: number;
  /**
   * Change text size
   */
  textSize?: Size;
}

const Tabs = ({
  items,
  onSelect,
  backgroundColor,
  borderColor,
  hoverBgColor,
  activeBorderColor,
  textColor,
  sliderPosition = 0,
  textSize = "small",
  ...props
}: TabsProps) => {
  const theme = useTheme();

  return (
    <Container
      backgroundColor={backgroundColor}
      data-testid="tabs-component"
      {...props}
    >
      {items &&
        items.map((item: Item) => {
          return (
            <Button
              key={`tab-${item.id}`}
              data-testid="tab-button"
              onClick={() => onSelect(item.id)}
              borderColor={borderColor}
              hoverBgColor={hoverBgColor}
            >
              {!!item.text && (
                <Text
                  fontWeight="500"
                  size={textSize}
                  color={textColor || theme.colors.black}
                >
                  {item.text}
                </Text>
              )}
            </Button>
          );
        })}
      <Slider
        activeBorderColor={activeBorderColor}
        translateX={sliderPosition * 100}
        numberOfItems={items.length}
      />
    </Container>
  );
};

export default memo(Tabs);
