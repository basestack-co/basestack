import styled from "styled-components";
import { grid, type GridProps as SSGridProps } from "styled-system";

// Define only the props that grid uses, to filter from DOM
const styledSystemProps = new Set([
  "gap",
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

export interface GridProps extends SSGridProps {
  gap?: string;
}

const Grid = styled.div.withConfig({
  shouldForwardProp,
})<GridProps>`
  display: grid;
  gap: ${({ gap }) => gap};
  ${grid};
`;

export default Grid;
