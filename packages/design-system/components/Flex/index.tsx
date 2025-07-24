import styled, { css } from "styled-components";
import {
  type FlexboxProps,
  flexbox,
  type ResponsiveValue,
} from "styled-system";

export interface FlexProps extends FlexboxProps {
  gap?: ResponsiveValue<string | number>;
  rowGap?: ResponsiveValue<string | number>;
  columnGap?: ResponsiveValue<string | number>;
}

const styledSystemProps = new Set([
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
  // gap-related
  "gap",
  "rowGap",
  "columnGap",
]);

const shouldForwardProp = (prop: string) => !styledSystemProps.has(prop);

const Flex = styled.div.withConfig({
  shouldForwardProp,
})<FlexProps>`
  display: flex;
  ${flexbox};

  ${({ gap }) =>
    gap &&
    css`
      gap: ${typeof gap === "number" ? `${gap}px` : gap};
    `}
  ${({ rowGap }) =>
    rowGap &&
    css`
      row-gap: ${typeof rowGap === "number" ? `${rowGap}px` : rowGap};
    `}
  ${({ columnGap }) =>
    columnGap &&
    css`
      column-gap: ${
        typeof columnGap === "number" ? `${columnGap}px` : columnGap
      };
    `}
`;

export default Flex;
