import styled from "styled-components";
import {
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  color,
  ColorProps,
} from "styled-system";

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
]);

const shouldForwardProp = (prop: string) => !styledSystemProps.has(prop);

export interface BoxProps
  extends LayoutProps,
    SpaceProps,
    FlexboxProps,
    ColorProps {}

const Box = styled.div.withConfig({
  shouldForwardProp,
})<BoxProps>`
  ${compose(layout, space, flexbox, color)};
`;

export default Box;
