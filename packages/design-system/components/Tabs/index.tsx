import { memo, useEffect, useReducer, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { SpaceProps, variant } from "styled-system";
import IconButton from "../IconButton";
import Text from "../Text";
import type { Size } from "../Text/types";
import {
  Button,
  Container,
  ContentContainer,
  Slider,
  Tab,
  Wrapper,
} from "./styles";

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
  onSelect: (selected: string, index: number) => void;
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
  /**
   * Changes tabs styling
   */
  type?: "tabs" | "buttons";
  /**
   * Changes tabs sizing
   */
  variant?: "compact" | "fullWidth";
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
  type = "tabs",
  variant = "fullWidth",
  ...props
}: TabsProps) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [{ selected, translateX, width }, dispatch] = useReducer(reducer, {
    selected: sliderPosition || 0,
    translateX: 0,
    width: 0,
  });

  useEffect(() => {
    const updateValues = () => {
      if (buttonRefs.current[selected]) {
        const selectedButton = buttonRefs.current[selected];
        const buttonWidth = selectedButton ? selectedButton.offsetWidth : 0;
        const buttonLeft = selectedButton ? selectedButton.offsetLeft : 0;

        dispatch({
          type: "SET_SELECTED_VALUES",
          payload: { selected, translateX: buttonLeft, width: buttonWidth },
        });
      }
    };

    updateValues();

    window.addEventListener("resize", updateValues);

    return () => {
      window.removeEventListener("resize", updateValues);
    };
  }, [selected, items]);

  const checkScrollPossibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPossibility();

    const ref = scrollRef.current;

    if (ref) {
      ref.addEventListener("scroll", checkScrollPossibility);
    }

    const handleWindowResize = () => {
      checkScrollPossibility();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      if (ref) {
        ref.removeEventListener("scroll", checkScrollPossibility);
      }
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderIconButton = (position: "right" | "left") => {
    const isLeftButton = position === "left";
    return (
      <IconButton
        onClick={() => {
          if (!scrollRef.current) return;

          const scrollAmount = 110;
          const targetScroll =
            scrollRef.current.scrollLeft +
            (isLeftButton ? -scrollAmount : scrollAmount);

          scrollRef.current.scrollTo({
            left: targetScroll,
            behavior: "smooth",
          });
        }}
        variant="secondary"
        position="absolute"
        top={type === "tabs" ? "6px" : "2px"}
        zIndex={3}
        {...(isLeftButton
          ? { left: "-1px", icon: "arrow_back" }
          : { right: "-1px", icon: "arrow_forward" })}
      />
    );
  };

  return (
    <Container backgroundColor={backgroundColor} borderColor={borderColor}>
      {canScrollLeft && renderIconButton("left")}
      {canScrollRight && renderIconButton("right")}
      <ContentContainer ref={scrollRef}>
        <Wrapper
          isButtonGroup={type === "buttons"}
          backgroundColor={backgroundColor}
          data-testid="tabs-component"
          {...props}
        >
          {items?.map((item: Item, index) => {
            const isActive = index === sliderPosition;

            return type === "tabs" ? (
              <Tab
                // @ts-ignore
                ref={(el) => (buttonRefs.current[index] = el)}
                key={`tab-${item.id}`}
                data-testid="tab-button"
                onClick={() => {
                  dispatch({
                    type: "SET_SELECTED_VALUES",
                    payload: { selected: index, translateX, width },
                  });
                  onSelect(item.id, index);
                }}
                borderColor={borderColor}
                hoverBgColor={hoverBgColor}
                isCompact={variant === "compact"}
              >
                {!!item.text && (
                  <Text
                    fontWeight="500"
                    size={textSize}
                    color={textColor || theme.tabs.color}
                    flexShrink={0}
                    lineTruncate
                  >
                    {item.text}
                  </Text>
                )}
              </Tab>
            ) : (
              <Button
                key={`tab-${item.id}`}
                onClick={() => onSelect(item.id, index)}
                isActive={isActive}
                isCompact={variant === "compact"}
              >
                {!!item.text && (
                  <Text
                    fontWeight="500"
                    size={textSize}
                    color={
                      isActive
                        ? theme.tabs.button.active.text.color
                        : theme.tabs.color
                    }
                    flexShrink={0}
                    lineTruncate
                  >
                    {item.text}
                  </Text>
                )}
              </Button>
            );
          })}
          {type === "tabs" && (
            <Slider
              activeBorderColor={activeBorderColor}
              translateX={translateX}
              width={width}
              isCompact={variant === "compact"}
            />
          )}
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};

export default memo(Tabs);
