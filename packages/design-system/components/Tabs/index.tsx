import { memo, useEffect, useState, useRef } from "react";
import { useTheme } from "styled-components";
import { SpaceProps } from "styled-system";
import IconButton from "../IconButton";
import Text from "../Text";
import { Size } from "../Text/types";
import {
  Container,
  Button,
  Slider,
  Wrapper,
  ContentContainer,
  Tab,
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
  type = "tabs",
  ...props
}: TabsProps) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPossibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScrollPossibility();

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScrollPossibility);
    }

    const handleWindowResize = () => {
      checkScrollPossibility();
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScrollPossibility);
      }
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const renderIconButton = (position: "right" | "left") => {
    const isLeftButton = position === "left";
    return (
      <IconButton
        onClick={() => {
          if (scrollRef.current) {
            isLeftButton
              ? (scrollRef.current.scrollLeft -= 110)
              : (scrollRef.current.scrollLeft += 110);
          }
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
    <Container>
      {canScrollLeft && renderIconButton("left")}
      {canScrollRight && renderIconButton("right")}
      <ContentContainer ref={scrollRef}>
        <Wrapper
          isButtonGroup={type === "buttons"}
          backgroundColor={backgroundColor}
          data-testid="tabs-component"
          {...props}
        >
          {items &&
            items.map((item: Item, index) => {
              const isActive = index === sliderPosition;

              return type === "tabs" ? (
                <Tab
                  key={`tab-${item.id}`}
                  data-testid="tab-button"
                  onClick={() => onSelect(item.id, index)}
                  borderColor={borderColor}
                  hoverBgColor={hoverBgColor}
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
              translateX={sliderPosition * 100}
              numberOfItems={items.length}
            />
          )}
        </Wrapper>
      </ContentContainer>
    </Container>
  );
};

export default memo(Tabs);
