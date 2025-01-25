import { useReducer, useRef, useEffect, memo } from "react";
import { SpaceProps } from "styled-system";
import { useTheme } from "styled-components";
import Text from "../Text";
import Icon from "../Icon";
import { Container, Button, Slider, Wrapper } from "./styles";

type Item = {
  label?: string;
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

const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SELECTED_VALUES":
      return {
        ...state,
        selected: action.payload.selected,
        translateX: action.payload.translateX,
        width: action.payload.width,
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
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [{ selected, translateX, width }, dispatch] = useReducer(reducer, {
    selected: selectedIndex || 0,
    translateX: 0,
    width: 0,
  });

  useEffect(() => {
    if (buttonRefs.current[selected]) {
      const selectedButton = buttonRefs.current[selected];
      const buttonWidth = selectedButton ? selectedButton.offsetWidth : 0;
      const buttonLeft = selectedButton ? selectedButton.offsetLeft : 0;

      dispatch({
        type: "SET_SELECTED_VALUES",
        payload: { selected, translateX: buttonLeft, width: buttonWidth },
      });
    }
  }, [selected, items]);

  return (
    <Container data-testid="segment-component" {...props}>
      <Wrapper>
        {items.map((item: Item, index: number) => {
          const buttonProps = selected === index ? { className: "active" } : {};
          return (
            <Button
              key={index.toString()}
              data-testid="segment-button"
              {...buttonProps}
              // @ts-ignore
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => {
                onSelect(item.id);
                dispatch({
                  type: "SET_SELECTED_VALUES",
                  payload: { selected: index, translateX, width },
                });
              }}
            >
              {!!item.icon && (
                <Icon icon={item.icon} color={theme.segment.icon.color} />
              )}
              {!!item.text && (
                <Text
                  size="small"
                  ml={!!item.icon ? theme.spacing.s1 : 0}
                  flexShrink={0}
                >
                  {item.text}
                </Text>
              )}
              {!!item.label && (
                <Text
                  size="small"
                  ml={theme.spacing.s1}
                  flexShrink={0}
                  color={
                    theme.segment.label[selected === index ? "active" : "color"]
                  }
                >
                  {item.label}
                </Text>
              )}
            </Button>
          );
        })}
        <Slider $width={width} translateX={translateX} />
      </Wrapper>
    </Container>
  );
};

export default memo(Segment);
