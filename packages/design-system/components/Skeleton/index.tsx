import React, { memo } from "react";
// Components
import { Container, Item, Wrapper } from "./styles";

interface SkeletonProps {
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
  }>;
}

const Skeleton = ({
  backgroundColor,
  padding,
  items,
  hasShadow = true,
  displayInline = false,
}: SkeletonProps) => (
  <Container
    backgroundColor={backgroundColor}
    padding={padding}
    hasShadow={hasShadow}
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
        />
      ))}
    </Wrapper>
  </Container>
);

export default memo(Skeleton);
