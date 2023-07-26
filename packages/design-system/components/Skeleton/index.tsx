import React, { memo } from "react";
// Components
import { Container, Item, Wrapper } from "./styles";

export interface SkeletonProps {
  numberOfItems?: number;
  gapBetweenItems?: number;
  backgroundColor?: string;
  padding?: number;
  displayInline?: boolean;
  hasShadow?: boolean;
  items: Array<{
    h: number;
    w: number | string;
    mb?: number | string;
    mr?: number | string;
    ml?: number | string;
    isRound?: boolean;
  }>;
}

// {Array.from(Array(3).keys()).map((item) => (

const Skeleton = ({
  numberOfItems = 1,
  gapBetweenItems = 0,
  backgroundColor,
  padding,
  items,
  hasShadow = true,
  displayInline = false,
}: SkeletonProps) => (
  <>
    {Array.from(Array(numberOfItems).keys()).map((item) => (
      <Container
        key={item}
        backgroundColor={backgroundColor}
        padding={padding}
        hasShadow={hasShadow}
        marginBottom={gapBetweenItems}
      >
        <Wrapper displayInline={displayInline}>
          {items.map((item, index) => (
            <Item
              key={index}
              height={item.h}
              width={item.w}
              marginBottom={item.mb || 0}
              marginRight={item.mr || 0}
              marginLeft={item.ml || 0}
              isRound={item.isRound}
            />
          ))}
        </Wrapper>
      </Container>
    ))}
  </>
);

export default memo(Skeleton);
