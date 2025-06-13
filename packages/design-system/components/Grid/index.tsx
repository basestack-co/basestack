import styled from "styled-components";
import { grid, GridProps as SSGridProps } from "styled-system";

// Define only the props that grid uses, to filter from DOM
const styledSystemProps = new Set([
  "gridGap",
  "gridColumnGap",
  "gridRowGap",
  "gridColumn",
  "gridRow",
  "gridArea",
  "gridAutoFlow",
  "gridAutoRows",
  "gridAutoColumns",
  "gridTemplateRows",
  "gridTemplateColumns",
  "gridTemplateAreas",
  "placeItems",
  "placeContent",
  "placeSelf",
]);

const shouldForwardProp = (prop: string) => !styledSystemProps.has(prop);

export interface GridProps extends SSGridProps {}

const Grid = styled.div.withConfig({
  shouldForwardProp,
})<GridProps>`
  display: grid;
  ${grid};
`;

export default Grid;
