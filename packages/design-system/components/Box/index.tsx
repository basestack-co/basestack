import styled from "styled-components";
import {
  type BackgroundProps,
  type BorderProps,
  background,
  border,
  type ColorProps,
  color,
  compose,
  type FlexboxProps,
  flexbox,
  type LayoutProps,
  layout,
  type PositionProps,
  position,
  type SpaceProps,
  space,
  system,
} from "styled-system";

// custom system helper for cursor
const cursor = system({
  cursor: true,
});

// List of props to exclude from being passed to the DOM
const styledSystemProps = new Set([
  // layout
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "display",
  "verticalAlign",
  "size",
  // space
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  // flexbox
  "alignItems",
  "alignContent",
  "justifyItems",
  "justifyContent",
  "flexWrap",
  "flexDirection",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "justifySelf",
  "alignSelf",
  "order",
  // color
  "color",
  "bg",
  "backgroundColor",
  "opacity",
  // position
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  // background
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  // border
  "border",
  "borderWidth",
  "borderStyle",
  "borderColor",
  "borderRadius",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  // cursor
  "cursor",
]);

const shouldForwardProp = (prop: string) => !styledSystemProps.has(prop);

export interface BoxProps
  extends LayoutProps,
    SpaceProps,
    FlexboxProps,
    ColorProps,
    PositionProps,
    BackgroundProps,
    BorderProps {
  cursor?: string;
}

const Box = styled.div.withConfig({
  shouldForwardProp,
})<BoxProps>`
  ${compose(
    layout,
    space,
    flexbox,
    color,
    position,
    background,
    border,
    cursor,
  )};
`;

export default Box;
