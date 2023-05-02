import { useReducer, memo } from "react";
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
  selectedIndex?: number;
}

const reducer = (
  state: any,
  action: { type: any; payload: { selected: number; translateX: number } }
) => {
  switch (action.type) {
    case "SET_SELECTED_VALUES":
      return {
        ...state,
        selected: action.payload.selected,
        translateX: action.payload.translateX,
      };
    default:
      return state;
  }
};

const Segment = ({
  items,
  onSelect,
  selectedIndex,
  ...props
}: SegmentProps) => {
  const theme = useTheme();
  const [{ selected, translateX }, dispatch] = useReducer(reducer, {
    selected: 0,
    translateX: (selectedIndex || 0) * 100,
  });

  return (
    <Container data-testid="segment-component" {...props}>
      {items.map((item: Item, index: number) => {
        const buttonProps = selected === index ? { className: "active" } : {};
        return (
          <Button
            key={index.toString()}
            data-testid="segment-button"
            {...buttonProps}
            onClick={() => {
              dispatch({
                type: "SET_SELECTED_VALUES",
                payload: { selected: index, translateX: index * 100 },
              });
              onSelect(item.id);
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
